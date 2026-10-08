---
---

## Le principe

Le modèle ne voit jamais le code d'un outil. Il voit un nom, une description et un schéma de paramètres, et c'est la description qui décide quand l'outil est appelé.

## Pourquoi c'est important

Une description floue, et le modèle appelle le mauvais outil, ou n'en appelle aucun. Un outil qui ne valide pas ses arguments, et une valeur mal formée déclenche une action inutile ou fausse. Enfin, une description est du texte qui entre dans le contexte du modèle : elle peut mentir, ou donner des ordres.

## Le mécanisme

1. **Écrire chaque description pour le modèle** : ce que fait l'outil, quand l'utiliser, ses paramètres, ce qu'il renvoie.
2. **Valider les arguments avant toute action**. Une erreur nomme les valeurs valides, pour que l'appel puisse se corriger.
3. **Lecture seule par défaut**. Nommer, un par un, les outils qui changent l'état.
4. **Séparer raisonner et agir** : le modèle décide, l'outil exécute, le système enregistre. Chaque couche se teste seule.
5. **Relire un outil qu'on n'a pas écrit** avant de le brancher : une étiquette « lecture seule » est une affirmation, pas une preuve. Et un outil qui va chercher une adresse décide avant d'ouvrir la connexion.

## Sur le terrain

- [AWS Scholars, chapitre 2](/fr/books/aws-scholars/chapter-02/) : le nom d'opération de chaque route d'API devient le nom de l'outil que le modèle voit, et la description de l'outil de recherche lui dit quand l'appeler.
- [Dev3Pack, Session 4](/fr/books/dev3pack/session-04/) : un montant négatif ou une devise inconnue sont refusés avant l'appel, et le refus nomme les valeurs valides.
- [Dev3Pack, Session 12](/fr/books/dev3pack/session-12/) : sur seize outils annoncés par un serveur, deux seulement peuvent faire bouger l'argent.
- [Dev3Pack, Session 13](/fr/books/dev3pack/session-13/) : une garde décide, sur la seule chaîne de caractères, si une adresse est autorisée, avant toute requête.

## La question à se poser

> Si je ne lisais que le nom et la description, saurais-je quand appeler cet outil, et ce qu'il peut casser ?
