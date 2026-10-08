---
workedOn: 2026-10-03
---

Un serveur MCP annonce des outils par leur nom et leur description. Il faut lire ce qu'il offre vraiment, repérer ceux qui peuvent agir, et refuser ceux dont la description ment ou donne des ordres : une description d'outil entre telle quelle dans le contexte du modèle, et une phrase cachée dedans est un ordre écrit par un inconnu.

## Le concept

Pense au prospectus d'un fonds. On le lit, mais ce qui compte, c'est ce que le fonds peut réellement faire de l'argent, pas son nom.

1. **Lister les noms** : outils, ressources (par URI), prompts.
2. Repérer ce qui est **annoncé mais vide**.
3. **Classer les outils** : lire, construire des octets non signés, changer l'état.
4. **Relire chaque outil** avant de l'exposer au modèle.

## Comment j'ai travaillé

Comme depuis la Session 4 : le code est écrit par l'assistant, testé contre la vraie check et expliqué ligne à ligne ; j'ai relancé la check moi-même avant de rendre.

## Ce que contient le rendu

- **`describe_surface`.** Pour chaque collection, on lit le `name` ou l'`uri` de chaque entrée ; une collection absente donne une liste vide. Une capacité annoncée sans rien derrière (`advertised_but_empty`) est un signal à remonter, pas un zéro.
- **Le classement des 16 outils d'Orquestra**, le serveur Solana de Gecko : 10 lisent, 4 construisent des octets non signés, qui ne font rien tant que personne ne signe, et 2 seulement changent l'état, `try_purchase` et `submit_transaction`. `prepare_purchase` paraît dangereux et ne l'est pas : il prépare une transaction, mais ne la signe pas.
- **`review_tool`.** Il refuse une description qui donne un ordre, un outil « lecture seule » dont la description parle d'écrire (les deux conditions ensemble), et toute permission joker `*`.

Deux erreurs de collage de ma part, dans la même cellule : une ligne collée à l'intérieur du `return` (`SyntaxError`), puis deux anciennes lignes laissées sous le nouveau code, qui écrasaient le résultat (`tools 0`). En Python, la dernière affectation gagne.

## Ce que je retiens

- Un nom et une étiquette « read_only » sont des affirmations, pas des preuves.
- Peu d'outils peuvent vraiment faire bouger l'argent : on les nomme.
- En Python, la dernière affectation gagne : une vieille ligne laissée sous le nouveau code l'annule.

## La question de défense

> Lesquels de ces outils sont dangereux ?

Sur les 16 outils d'Orquestra, seuls `try_purchase` et `submit_transaction` changent l'état ; les autres lisent ou préparent des octets non signés. Mon agent ne signe rien sans avoir vérifié chaque champ, et je relis chaque description d'outil comme une donnée, pas comme une instruction.

Résultat : 300/300, rendu par la [PR #560](https://github.com/Gecko-Academy/dev3pack-submissions/pull/560).
