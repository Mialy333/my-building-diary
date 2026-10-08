---
---

Un système de support client pour NovaMart, une enseigne e-commerce fictive : cinq agents Strands qui comprennent la demande, collectent les faits dans DynamoDB, interrogent trois Knowledge Bases en parallèle, décident d'un retour selon le palier du client, puis rédigent la réponse. Le tout déployé sur AgentCore Runtime, derrière un guardrail, avec mémoire, logs CloudWatch et traces X-Ray. Score final : 120/120.

**Ce qui était fourni, ce que j'ai fait.** La formation fournissait l'infrastructure (un template CloudFormation et les scripts de seed), le module d'observabilité, la suite de tests et un fichier `agent_orchestrator.py` rempli de TODO. Mon travail : créer les trois Knowledge Bases, écrire les cinq agents, le guardrail, le déploiement, la mémoire et l'observabilité, puis aller au-delà du 120/120 avec quatre extras.

## Comment les pièces s'articulent

L'Orchestrator (Claude Haiku 4.5, température 0) ne répond jamais lui-même. Il route vers quatre agents spécialisés (Claude Sonnet 4.5) :

- **InventoryAgent** lit les commandes et le palier du client. Il rapporte des faits, ne décide rien.
- **RefundAgent** décide de l'éligibilité d'un retour : 30 jours pour un client Standard, 60 pour un Premium.
- **PolicyAgent** répond aux questions de politique en interrogeant trois sous-agents, un par Knowledge Base (retours, livraison, garantie), lancés en parallèle.
- **CommunicationAgent** passe toujours en dernier et rédige la réponse au client.

Les agents ne se parlent pas directement. Chacun écrit son résultat dans une ligne DynamoDB partagée, le **WorkflowState**, avec un numéro de version. Avant d'écrire, un agent vérifie que la version n'a pas bougé depuis sa lecture ; sinon, l'écriture est refusée. C'est le verrouillage optimiste : deux agents ne peuvent pas s'écraser en silence.

Le routage suit six règles écrites dans le prompt de l'Orchestrator. Une question de statut va à Inventory puis Refund ; une question de politique va à Policy ; « quel est mon palier ? » va à Inventory, jamais à Policy ; un calcul va directement au CommunicationAgent ; et la dernière étape est toujours le CommunicationAgent.

## Ce que j'ai construit

**Les trois Knowledge Bases**, chacune sur son préfixe S3 (`policies/returns/`, `shipping/`, `warranty/`), sur le vector bucket de la stack, avec Titan Embeddings V2. Pointer le bucket entier aurait indexé les trois domaines dans chaque base, et le test parallèle n'aurait plus rien distingué.

**Les cinq agents**, quinze outils documentés (but, paramètres, retour : c'est ce que le modèle lit pour choisir). La recherche parallèle passe par un `ThreadPoolExecutor` à trois workers. La trace X-Ray le prouve : les trois appels aux Knowledge Bases (819, 755 et 821 ms) démarrent ensemble et se chevauchent.

**Le guardrail** : filtres de contenu, données personnelles (carte bancaire et numéro de sécurité sociale bloqués, email et téléphone anonymisés), liste de grossièretés, et trois sujets interdits : produits concurrents, négociation de prix, menaces juridiques.

**Le déploiement, la mémoire, l'observabilité** : un seul `deploy`, passé du premier coup, qui enchaîne guardrail, Runtime, mémoire de session résumée (7 jours), logs CloudWatch et traces X-Ray échantillonnées à 100 %.

## Là où le prompt ne suffisait pas

Le fil de ce projet : chaque règle confiée au seul prompt a fini par céder, à un test ou à une trace.

- **« Un outil à la fois. »** Sur une simple question de statut, le RefundAgent répondait qu'il n'avait pas encore les faits. La trace montrait Refund lancé *avant* Inventory : Haiku avait émis les deux appels dans le même tour, et Strands exécute par défaut les outils d'un même tour en parallèle. Le verrouillage optimiste a rattrapé le conflit d'écriture, mais la réponse était fausse. Correctif dans le code : un exécuteur séquentiel sur l'Orchestrator.
- **Un guardrail qui bloque la bonne question.** Le test « 5 articles à 29,99 $ avec 10 % de remise » était classé « négociation de prix ». La définition parlait de calcul, et un exemple ressemblait trop à une question légitime. J'ai écrit un script qui ajuste le brouillon du guardrail, rejoue 14 cas, et ne publie une version que si les 14 passent.
- **Un retour jamais demandé.** Comme la règle de routage envoie aussi les questions de statut au RefundAgent, il aurait pu initier un retour que personne n'avait demandé. Il n'agit désormais que sur une demande explicite.
- **Une date inconnue, anticipée.** Le modèle ne connaît pas la date du jour : sans elle, le calcul des 30 ou 60 jours serait faux. Les outils renvoient donc l'âge de la commande, calculé par le code.
- **Un historique partagé.** Un agent Strands garde ses messages d'un appel à l'autre, et le Runtime réutilise le même Orchestrator pour tous les clients. Chaque agent repart donc d'un historique vide à chaque requête, et celui de l'Orchestrator est vidé quand la session change.

## Au-delà du 120/120

**Attaquer mon propre système.** Dix requêtes adverses envoyées au système déployé. Les cinq attaques (négociation, concurrent, menace, numéro de sécurité sociale, insulte) sont bloquées par la bonne politique ; les deux injections de prompt ne divulguent rien et n'obtiennent aucun retour. Mais le dixième cas, un client qui demande les données d'un autre, cachait un problème : la réponse était un refus correct, pourtant la trace montrait l'Orchestrator seul, sans initialisation ni CommunicationAgent. Deux correctifs dans le code : un hook qui lance le CommunicationAgent s'il n'a pas été appelé, et une vérification du client dans les outils DynamoDB eux-mêmes. Retest : dix sur dix.

**Une défense en profondeur sur ce qui écrit.** L'outil qui initie un retour revérifie le statut, le palier et la fenêtre, puis fait une écriture conditionnelle. Même un modèle trompé par une injection ne peut pas faire accepter un retour inéligible à la base.

**Un tableau de bord CloudWatch** : invocations, latence par agent, blocages du guardrail. Le rôle d'exécution n'avait pas le droit de publier des métriques ; je les ai écrites dans les logs au format EMF, que CloudWatch convertit en métriques, sans toucher à l'IAM.

**Une mémoire de session dans DynamoDB.** La persistance marchait après un redémarrage simulé, mais la réponse oubliait le tour précédent : seul l'Orchestrator avait l'historique, et c'est le CommunicationAgent qui écrit. Correctif : l'historique de la conversation lui est transmis par le code.

**Un front web avec connexion Cognito.** Une page qui interroge le Runtime via une Lambda. L'identifiant client vient du jeton, jamais du navigateur : modifier la requête ne change pas qui l'on est. Et une URL de fonction Lambda plutôt qu'API Gateway, parce qu'une requête multi-agents dure de 20 à 50 secondes, au-delà de sa limite de 30.

## Ce que je retiens

1. Ce qui doit toujours arriver s'impose dans le code ; le prompt ne fait que le demander.
2. Une bonne réponse ne prouve rien : la trace montre le chemin.
3. Tester un guardrail comme du code, avant chaque version.
4. Toute action qui écrit revérifie ses conditions elle-même.
5. Une mémoire ne sert que si le bon agent la voit.

Une considération de production : la chronologie X-Ray montrait que les recherches ne pèsent que 0,8 seconde sur les quelque 10,6 de la recherche parallèle ; le reste, ce sont les appels au modèle des trois sous-agents. Le rubric les imposait. En production, des appels directs aux Knowledge Bases suffiraient.

J'ai raconté ce projet sous l'angle des leçons dans [un article sur dev.to](https://dev.to/mialy333/from-finance-to-ai-engineering-6-lessons-i-learned-building-a-multi-agent-support-system-on-amazon-2fm1).
