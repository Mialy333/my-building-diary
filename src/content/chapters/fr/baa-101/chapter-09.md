---
---

## Le principe

Une évaluation ne vaut que ce qu'elle vérifie. On lit le détail plutôt que la moyenne, on change une seule chose à la fois, et on essaie de tromper son propre évaluateur.

## Pourquoi c'est important

Une moyenne cache la forme des résultats. Un score mesuré sur les cas qu'on vient de corriger ne prouve rien. Un juge qui lit la réponse ne voit pas ce que l'agent a réellement fait. Et un test vert sur un faux modèle prouve la tuyauterie, pas la qualité.

## Le mécanisme

1. **Une suite par comportement** : chaque chemin attendu, les cas limites, les attaques.
2. **Lire cas par cas**, pas seulement le score global.
3. **Une variable à la fois**, et un nouveau nom pour chaque run, pour comparer proprement.
4. **Des cas inédits** : rapporter l'amélioration et la régression, avec leurs chiffres.
5. **Attaquer l'évaluateur** : un faux modèle qui triche révèle les réussites gratuites.
6. **Savoir ce qui a produit le chiffre** : quel modèle, quel fichier. Une mesure faite sur la mauvaise version se signale comme fausse.

## Sur le terrain

- [AWS Scholars, chapitre 1](/fr/books/aws-scholars/chapter-01/) : 0.92 sur 13 cas, c'est 12 réponses parfaites et un échec franc. Et le juge note le texte, pas la ligne écrite en base.
- [Dev3Pack, Session 7](/fr/books/dev3pack/session-07/) : un faux modèle qui cite toujours le même document obtient déjà 50 %.
- [Dev3Pack, cap01](/fr/books/dev3pack/cap01/) : une porte d'évaluation verte sur un faux modèle ne montre ni hallucinations ni mauvaises réponses.
- [Dev3Pack, Final](/fr/books/dev3pack/final/) : un grade mesuré sur le mauvais fichier, écarté et signalé comme tel.

## La question à se poser

> Qu'est-ce que cette évaluation ne vérifie pas ?
