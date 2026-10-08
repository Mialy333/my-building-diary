---
workedOn: 2026-10-03
---

Un mini-agent est une boucle qui exécute un plan d'appels d'outils, et qui s'arrête toujours en disant pourquoi. Une boucle sans sorties tourne à vide, dépense sans limite, ou plante sur une erreur d'outil.

## Le concept

Pense à un ordre de bourse avec plafond et stop : on sait d'avance à quelles conditions il s'arrête, et le relevé dit laquelle a joué. La boucle a quatre sorties, testées dans cet ordre :

1. **`answered`** : le plan a la réponse.
2. **`repeated_call`** : le même outil, avec les mêmes arguments, que l'appel précédent.
3. **`budget`** : le plafond d'appels est atteint, vérifié **avant** l'appel.
4. **`tool_error`** : un outil a refusé.

Chaque run rend un reçu : `{steps, stopped_because, answer, refusal}`.

## Comment j'ai travaillé

Comme depuis la Session 4 : le code est écrit par l'assistant, testé contre la vraie check et expliqué ligne à ligne ; j'ai relancé la check moi-même avant de rendre.

## Ce que contient le rendu

**`run_loop` et ses quatre sorties.**

- `answered` n'est pas un appel : il n'est jamais compté dans `steps`.
- `repeated_call` : on garde le dernier appel sous la forme `(nom, arguments)` ; le même couple deux fois de suite signale une boucle à vide.
- `budget` : `len(steps) >= budget` est testé **avant** l'appel, pour qu'il n'y ait jamais un appel de trop. Un plan épuisé sans réponse sort aussi par là.
- `tool_error` : un `try/except ToolError` transforme l'erreur en refus qui nomme l'outil, au lieu d'un plantage.

**Le weekly challenge : un bot `respond(text, chat)`**, avec `run_loop` derrière.

- Un message répété ne consomme pas d'appel.
- Cinq appels par conversation, puis « come back in 1 hour » : un budget qui se rétablit.
- Un outil à soi, `page`, qui refuse un identifiant inconnu.
- Un outil inexistant refusé proprement, et la sortie de la boucle visible dans la réponse.

Le premier essai est sorti à 400/500 : un outil inconnu levait une `KeyError` au lieu d'un refus. Corrigé, il est passé à 500/500. C'est exactement la panne que la session apprend à éviter.

## Ce que je retiens

- Une boucle d'agent se conçoit par ses sorties : on écrit d'abord comment elle s'arrête.
- Le budget se vérifie avant l'appel, jamais après.
- Une erreur d'outil devient un refus lisible, pas un plantage.

## La question de défense

> Qu'est-ce qui empêche votre agent de tourner en rond ?

Deux sorties. Le même appel deux fois de suite déclenche `repeated_call`, et un budget compté avant chaque appel déclenche `budget`. Dans les deux cas, la personne lit une phrase qui dit pourquoi ça s'est arrêté.

Résultat : 700/700 (200 pour la session, 500 pour le challenge), rendu par la [PR #553](https://github.com/Gecko-Academy/dev3pack-submissions/pull/553).
