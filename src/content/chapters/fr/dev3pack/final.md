---
workedOn: 2026-10-03
---

Le final assignment : mon propre repo contient l'agent de recherche du cours, et un grader privé lui pose 15 questions que je ne vois pas. Il réussit avec au moins 30 % de bonnes réponses **et** les 6 questions critiques. C'est la seule note qui donne le certificat. Avec le faux modèle, l'agent obtient 27 % et rate les deux conditions : sans vrai modèle, il ne sait que refuser.

## Le concept

Pense à un audit externe. On ne connaît pas les questions ; on se prépare sur un jeu d'entraînement de 10 questions, et c'est la conformité aux points critiques qui décide.

L'agent de départ est le pipeline construit de session en session : l'adapter de modèle, les sorties structurées, les outils bornés, la récupération, les citations vérifiées, le refus quand rien ne soutient la réponse.

## Comment j'ai travaillé

Le code de l'agent a été écrit par l'assistant, testé hors ligne avant chaque livraison et expliqué. Les choix du modèle et toutes les exécutions sont de moi. J'ai choisi de rester sur un modèle local, avec Ollama, plutôt que de payer une API. J'ai commencé avec `qwen2.5:7b-instruct`, puis je suis passée à la version 14B, que mes 36 Go de RAM permettaient. Chaque note ci-dessous vient d'un grade que j'ai lancé moi-même.

## Ce qui s'est passé, mesure après mesure

**La mise en route.** Mon premier essai de création du repo a échoué, et les commandes suivantes, non chaînées, ont tourné dans le mauvais dossier : 85 paquets retirés, un commit parasite, un repo GitHub vide. J'ai tout réparé, puis recréé le repo proprement. La leçon : chaîner avec `&&`, pour qu'une commande ne tourne que si la précédente a réussi.

**Le point de départ.** Faux modèle : 3/10. Qwen 7B : 4/10, et la porte critique échoue sur deux questions. La trace et le code du grader montrent pourquoi : le modèle reformule au lieu de citer, cite parfois des documents ramenés par erreur, et son premier JSON contenait un saut de ligne brut, qui a gaspillé le seul réessai.

**Le 14B et un agent réécrit : 5/10.** La trace d'une question critique montre que le passage qui répond n'était **jamais ramené** par la recherche : le modèle répondait avec un passage parasite. Pire, le filtre de citations retirait la bonne citation : une erreur de l'assistant, corrigée. Le correctif : garder au plus deux documents, ceux dont le meilleur passage atteint 60 % du meilleur score, et les envoyer **entiers**. Limite assumée : ce seuil de 60 % a été choisi en regardant les scores du jeu d'entraînement.

**Une mesure fausse.** Le nouveau fichier avait été copié sous le nom `agent-2.py`, alors que le grader lit `agent.py`. Le 4/10 obtenu mesurait donc l'ancienne version, et ses écarts venaient du hasard du modèle, pas du code. Depuis, je vérifie le fichier qui tourne (`grep -c` sur une phrase propre à la nouvelle version) avant de lire un score.

**La bonne version : 6/10.** Une seule question critique échoue encore : le modèle transforme les phrases du document en titres (« bounding capabilities » au lieu de « bound capabilities »), et le grader ne retrouve plus la source dans la réponse.

**Quatre retouches de prompt, aucun effet stable.** Recopier mot pour mot : une question critique passe, une autre casse. Une hypothèse de l'assistant sur les guillemets : la trace ne la confirme pas. Exiger des paragraphes complets : 5/10. Chaque correctif déplaçait la panne d'une question à l'autre.

**Le changement d'architecture.** Le modèle ne rédige plus : il **choisit** les numéros des paragraphes qui répondent. L'application les recopie mot pour mot, et les citations découlent des paragraphes choisis : elles ne peuvent plus être inventées. Aucun paragraphe choisi, c'est le refus standard. Résultat : **9/10 deux fois de suite**, porte critique franchie.

**Avant le rendu.** Un essai à blanc donne 11 réponses et 4 refus sur les questions privées. Dans les réponses, l'assistant a repéré des mots collés (« therefusal », « isa ») : sur ces réponses, le modèle avait recopié lui-même les paragraphes au lieu de renvoyer leurs numéros, et perdait des espaces. Correctif : une réponse libre qui reprend au moins la moitié des mots d'un paragraphe est remplacée par ce paragraphe exact.

**Le résultat officiel : 15/15.** Les 6 critiques passent : deux questions adversariales et quatre refus. Les quatre refus de l'essai à blanc étaient donc justes.

## Ce que je retiens

- Un petit modèle rédige mal mais choisit bien : on lui fait choisir, l'application recopie.
- Des citations qui découlent de ce qui est recopié ne peuvent pas être inventées.
- Chaque correctif se valide par une mesure, et une mesure fausse se signale comme telle.

## La question de défense

> Pourquoi votre agent passe-t-il avec un modèle local de 14 milliards de paramètres ?

Parce que le modèle ne rédige pas : il désigne les paragraphes qui répondent, et l'application les recopie mot pour mot, avec les citations qui en découlent. Ce qui reste au modèle, c'est le jugement : quel paragraphe, ou refuser. Le reste est vérifié par du code : documents envoyés entiers, garde contre l'injection, timeout, refus standard.

Résultat : 15/15 (100 %), certificat obtenu, rendu par la [PR #591](https://github.com/Gecko-Academy/dev3pack-submissions/pull/591).
