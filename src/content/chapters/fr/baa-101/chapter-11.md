---
---

## Le principe

Le prompt demande, le code garantit. Une règle qui doit tenir à chaque fois (un ordre d'exécution, une étape obligatoire, une condition avant d'écrire) se vérifie dans le code, pas seulement dans les instructions.

## Pourquoi c'est important

Un modèle suit ses consignes la plupart du temps. Une règle réduit un comportement sans l'éliminer, et un prompt long est moins bien suivi qu'un prompt court. Pour une action qui écrit, qui paie ou qui engage, « la plupart du temps » ne suffit pas.

## Le mécanisme

1. **Lister les invariants** : ce qui doit toujours arriver, ce qui ne doit jamais arriver.
2. **Un mécanisme en code pour chacun** : exécution séquentielle, étape finale forcée, vérification de champ, écriture conditionnelle.
3. **Épingler la demande** avant que l'action existe, et comparer l'action à cette épingle avant d'agir.
4. **Partager les rôles** : au modèle le jugement, au code l'exécution et la vérification.
5. **Tester que la garantie tient même quand le modèle se trompe.**

## Sur le terrain

- [AWS Scholars, chapitre 1](/fr/books/aws-scholars/chapter-01/) : une règle permissive laissait passer un ticket rempli de vide. En production, la validation des champs irait dans l'outil, pas dans le prompt.
- [AWS Scholars, chapitre 3](/fr/books/aws-scholars/chapter-03/) : « un outil à la fois » était dans le prompt, et le framework lançait les outils en parallèle. Correctifs en code : un exécuteur séquentiel, une étape finale forcée, la vérification du client dans les outils.
- [Dev3Pack, Final](/fr/books/dev3pack/final/) : le modèle choisit les paragraphes, le code les recopie, et les citations ne peuvent plus être inventées.
- [Dev3Pack, Gecko](/fr/books/dev3pack/gecko/) : la demande est épinglée avant la transaction, et rien n'est signé tant que chaque champ ne concorde pas.

## La question à se poser

> Si le modèle ignorait cette consigne une fois sur cent, que se passerait-il ?
