---
---

Un agent de support client sur Amazon Bedrock AgentCore, avec le Strands SDK et le modèle Amazon Nova 2 Lite. Il suit une commande, traite un remboursement, répond aux questions produit par RAG, se souvient du client d'une session à l'autre, calcule une remise de fidélité exacte et navigue sur le web.

**Ce qui était fourni, ce que j'ai fait.** La formation fournissait le squelette : un `main.py` rempli de TODO, le code des deux fonctions Lambda et un script de permissions. Mon travail : monter toute l'infrastructure à la main dans la console AWS, écrire les six sections de `main.py`, déployer, faire passer les six scénarios de test, et déboguer ce qui cassait en chemin.

## Comment les pièces s'articulent

Une commande `agentcore invoke` envoie un message au Runtime, un conteneur hébergé par AWS. Dans ce conteneur, `main.py` crée un agent Strands. Le modèle choisit un outil, Strands l'exécute, le résultat revient au modèle, et ainsi de suite jusqu'à la réponse finale.

Les outils viennent de quatre sources, et chacune tombe en panne à sa manière :

- **La Gateway**, un serveur MCP devant mes deux Lambdas. L'agent lui demande la liste des outils à chaque requête. Une Gateway en panne ne fait pas planter l'agent : un outil manque, tout simplement.
- **La Knowledge Base**, une fonction Python qui interroge le catalogue produit.
- **Le Code Interpreter et le Browser**, deux bacs à sable gérés par AgentCore, démarrés à la demande.

Deux mémoires cohabitent : la mémoire de session, qui disparaît en fin de conversation, et la mémoire long terme, rangée par client et extraite en une à deux minutes.

Et deux règles de propagation à ne jamais confondre : le conteneur est un **instantané** (modifier `main.py` ne change rien sans redéploiement), alors que les droits IAM sont lus **en direct** (un correctif prend effet en une minute, sans redéployer).

## Ce que j'ai construit

**L'infrastructure, à la main.** Deux Lambdas, une API REST à trois routes, la Gateway et ses deux cibles, la ressource Memory avec deux stratégies (faits et préférences du client). Un détail qui compte : le nom d'opération de chaque route devient le nom de l'outil que le modèle voit.

**Les six sections de `main.py` :**

- **RAG** : un outil `search_knowledge_base` dont la description dit clairement au modèle *quand* l'appeler, avec une clause de garde qui renvoie un message clair si la Knowledge Base n'est pas configurée.
- **Mémoire long terme** : un hook qui, avant chaque réponse, va chercher dans tous les espaces de mémoire du client, étiquette chaque souvenir par type, puis enregistre l'échange après la réponse.
- **Remise fidélité** : le calcul tourne dans le Code Interpreter, avec un repli en Python pur si le bac à sable est indisponible. Le résultat renvoie toujours les mêmes quatre champs.
- **Browser**, **configuration** et **point d'entrée** : l'agent est créé et invoqué à l'intérieur de la connexion à la Gateway, pour qu'elle reste ouverte pendant tout l'appel.

**L'ordre de construction.** Du moins cher au plus cher. La Knowledge Base facture en continu dès qu'elle existe : elle arrive en dernier. Un premier déploiement sans elle valide déjà le pipeline (build, rôle, région), et la clause de garde rend ce déploiement partiel sûr.

## Les pièges, consignés dans mon runbook

- **Une Gateway qui échoue en silence.** Une cible en échec renvoie une liste d'outils vide, sans erreur. L'agent répond poliment « je n'ai pas d'outil de commande ». La cause était côté API : sans réponses 200/404/500 déclarées sur les routes, la cible est rejetée.
- **Deux règles de nommage inverses.** Les cibles de la Gateway refusent les underscores ; le nom de l'agent refuse les tirets. Même projet, conventions opposées.
- **La mauvaise région.** L'outil de configuration prenait la région par défaut de ma machine, pas celle où vivaient la Gateway et la mémoire. Il faut l'imposer explicitement.
- **Une mémoire polluée.** Sans identifiant client, tous les tests écrivent dans le même « client par défaut », et l'agent finit par répondre à une question jamais posée. D'où un identifiant client explicite et une session neuve à chaque test.
- **Un repli trop convaincant.** Si le Code Interpreter ne tourne pas, le repli Python répond quand même, de façon plausible. Seuls les logs disent lequel des deux a calculé.
- **Un push refusé.** Le dossier de build du déploiement, avec un zip de dépendances de plus de 100 Mo, avait été commité par erreur. Retiré de l'historique et ajouté au `.gitignore`.

## Ma méthode de debug

Dans cet ordre : **isoler la couche avant de lire l'IAM**. Un `curl` sur l'API pour tester la Lambda seule, l'inspecteur MCP pour tester la Gateway sans agent, puis les logs du Runtime. Et toujours **lire l'appel d'outil, pas la réponse** : le modèle s'excuse de façon plausible, seuls les logs montrent le nom de l'outil, ses arguments et le résultat brut.

## Les six scénarios

Suivi de la commande ORD-001, remboursement d'une liseuse, avantages du palier Platinum par RAG, mémoire entre deux sessions (« je suis Jane, réponses concises », puis une nouvelle session qui s'en souvient), remise fidélité d'un membre Gold, et lecture du titre d'une page web.

## Ce que je retiens

1. Valider chaque couche seule avant de l'empiler.
2. Créer le plus cher en dernier, et le supprimer le jour même.
3. Lire l'appel d'outil, pas la réponse.
4. Un conteneur est un instantané ; l'IAM est lu en direct.
5. Des tests hermétiques : un client explicite, une session neuve.

Une considération de production : la Gateway tournait sans autorisation, acceptable uniquement dans un bac à sable. En production, jamais, et rien de sensible ne doit y transiter.
