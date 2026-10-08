---
---

## Le principe

Un agent est une boucle : le modèle lit le message, choisit de répondre ou d'appeler un outil, lit le résultat, puis recommence. Une boucle se conçoit d'abord par ses sorties : on écrit comment elle s'arrête avant d'écrire ce qu'elle fait.

## Pourquoi c'est important

Une boucle sans sorties tourne à vide, dépense sans limite, ou plante sur la première erreur d'outil. Et sans règles sur ce qui peut suivre quoi, un agent qui a décidé de refuser peut finir par répondre quand même.

## Le mécanisme

1. **La boucle** : message → modèle → appel d'outil → résultat → modèle → … → réponse. Un framework peut la faire tourner pour vous, ou vous l'écrivez ; dans les deux cas, ses sorties sont à vous.
2. **Les sorties d'abord** : une réponse, un appel identique au précédent, un budget atteint, une erreur d'outil.
3. **Le budget se compte avant l'appel**, jamais après : il n'y a jamais un appel de trop.
4. **Chaque arrêt dit pourquoi**, en une phrase lisible.
5. **Les transitions sont déclarées** : une table « état + événement → état suivant ». Ce qui n'y figure pas est refusé, et l'état ne bouge pas.
6. **La forme se choisit en comptant** : une chaîne fixe coûte un appel au modèle, une boucle un appel plus un éventuel réessai, une réflexion deux à trois.

## Sur le terrain

- [AWS Scholars, chapitre 2](/fr/books/aws-scholars/chapter-02/) : l'agent choisit un outil, le framework l'exécute, le résultat revient au modèle, jusqu'à la réponse finale. Un outil absent ne fait pas planter la boucle : il manque, tout simplement.
- [Dev3Pack, Session 5](/fr/books/dev3pack/session-05/) : une boucle à quatre sorties. Le premier essai du bot plantait sur un outil inconnu au lieu de le refuser.
- [Dev3Pack, Session 8](/fr/books/dev3pack/session-08/) : aucune flèche ne mène de « refuser » à « répondre », donc un refus ne devient jamais une réponse.

## La question à se poser

> Comment cette boucle s'arrête-t-elle, et que lit-on quand elle s'arrête ?
