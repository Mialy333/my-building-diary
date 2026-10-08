---
---

## Le principe

Pour comprendre ce qu'un agent a fait, on lit sa trace : quel outil, avec quels arguments, pour quel résultat brut. La réponse finale, elle, n'est qu'un texte plausible.

## Pourquoi c'est important

Un modèle s'excuse de façon convaincante, et une bonne réponse peut cacher un mauvais chemin. Sans trace, on corrige au hasard. Avec une trace qui contient des secrets, on fabrique une fuite.

## Le mécanisme

1. **Tracer chaque étape** : la recherche, l'appel au modèle, l'appel d'outil, la décision, avec leurs arguments et leurs résultats.
2. **Isoler la couche** : tester l'outil seul, puis à travers l'agent, avant de chercher plus loin.
3. **Classer chaque panne** avant de corriger (recherche, choix d'outil, consigne non suivie, format), et traiter la plus fréquente d'abord.
4. **Masquer les secrets** en les remplaçant par une étiquette stable, jamais en les supprimant : un trou ressemble à une absence.
5. **Savoir dire en une phrase** quel événement de la trace a décidé du résultat.

## Sur le terrain

- [AWS Scholars, chapitre 2](/fr/books/aws-scholars/chapter-02/) : isoler la couche d'abord, puis lire les logs, qui montrent le nom de l'outil, ses arguments et le résultat brut, là où le modèle ne fait que s'excuser.
- [AWS Scholars, chapitre 3](/fr/books/aws-scholars/chapter-03/) : la trace a montré un agent lancé avant celui dont il dépendait, puis, sur un refus correct, un orchestrateur qui avait sauté toutes ses règles.
- [Dev3Pack, Session 9](/fr/books/dev3pack/session-09/) : la trace distingue un document bien trouvé mais ignoré par le modèle d'un document jamais trouvé, deux corrections opposées. Et les secrets y entrent masqués.

## La question à se poser

> Quelle ligne de la trace a décidé de ce résultat ?
