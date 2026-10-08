---
workedOn: 2026-10-03
---

Un agent peut se souvenir d'une préférence et des dernières questions, à condition d'écrire d'abord ce qu'il garde, pour qui, et combien de temps. Une mémoire sans propriétaire ou sans limite fuit d'un utilisateur à l'autre, grossit sans fin, ou garde ce qu'elle n'aurait jamais dû garder : une clé, une adresse.

## Le concept

Pense au dossier client d'une banque privée. Un dossier par client, jamais lu par un autre conseiller sans droit, et une politique de conservation écrite avant d'ouvrir le premier dossier.

1. Un **état minimal** : une préférence, et les cinq derniers échanges.
2. La préférence **modifie la question avant** l'appel au modèle.
3. Une **politique de stockage** écrite.
4. Une mémoire indexée par **`(utilisateur, clé)`**.
5. Des **copies** à l'entrée et à la sortie.

## Comment j'ai travaillé

Comme depuis la Session 4 : le code et la politique de stockage sont écrits par l'assistant, testés contre la vraie check et expliqués ligne à ligne ; j'ai relancé la check moi-même avant de rendre.

## Ce que contient le rendu

- **`answer_with_state`.** Si la préférence est « short », la question reçoit « (answer briefly) » **avant** l'appel au modèle. `.get` évite une erreur quand la préférence n'existe pas. Puis `del state.episodes[:-5]` efface tout sauf les cinq derniers échanges : la mémoire a un plafond.
- **La politique de stockage**, en cinq lignes : ce qu'on garde, pourquoi, comment le corriger, quand ça expire, et ce qu'on refuse de garder : secrets, clés de wallet, données personnelles.
- **`MemoryStore`.**
  - Un identifiant d'utilisateur vide ou absent est refusé, à l'écriture comme à la lecture.
  - La clé est le couple `(propriétaire, clé)` : deux utilisateurs peuvent avoir chacun leur `locale`.
  - Une clé absente renvoie `None`, sans chercher ailleurs.
  - `deepcopy` à l'entrée et à la sortie : personne ne modifie la mémoire en éditant sa propre liste.

## Ce que je retiens

- On écrit la politique de mémoire avant de stocker quoi que ce soit, refus compris.
- Une mémoire se range par propriétaire, jamais dans un seau commun.
- Rendre une copie, pas l'objet : sinon le lecteur devient un second écrivain.

## La question de défense

> Votre agent mélange-t-il les mémoires de deux clients ?

Non : chaque valeur est rangée sous le couple (utilisateur, clé), un utilisateur vide est refusé, et une clé absente renvoie `None` sans chercher ailleurs. Et la politique écrite refuse de garder secrets, clés de wallet et données personnelles.

Résultat : 300/300, rendu par la [PR #559](https://github.com/Gecko-Academy/dev3pack-submissions/pull/559).
