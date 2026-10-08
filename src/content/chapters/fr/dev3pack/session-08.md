---
workedOn: 2026-10-03
---

Il existe trois façons d'organiser un agent : une chaîne fixe, une boucle où le modèle décide, une réflexion qui se relit. Et une table de transitions explicite rend son comportement lisible. Sans flèches déclarées, un refus peut se transformer en réponse, et un réessai sans compteur tourne à l'infini.

## Le concept

Pense au circuit de validation des ordres d'une salle de marché. Chaque étape a des sorties autorisées ; un ordre refusé ne peut pas revenir en exécution par un chemin non prévu.

1. **Compter** les appels au modèle de chaque façon d'organiser l'agent.
2. Savoir laquelle peut **refuser avant d'appeler** le modèle.
3. Écrire le graphe sous forme de **table** : `(état, événement) → état suivant`.
4. **Refuser** tout couple absent de la table, sans planter.
5. Garder un **historique qui ne fait que grandir**, pour plafonner les réessais.

Les flèches déclarées : `planning` mène à `retrieving` ou à `refusing` ; `retrieving` mène à `answering` ou à `refusing` ; `answering` et `refusing` mènent à `done`. Aucune flèche ne va de `refusing` à `answering`.

## Comment j'ai travaillé

Comme depuis la Session 4 : le code est écrit par l'assistant, testé contre la vraie check et expliqué ligne à ligne ; j'ai relancé la check moi-même avant de rendre.

## Ce que contient le rendu

- **Le tableau comparatif.** La chaîne coûte 1 appel. La boucle d'outils coûte 1 appel, plus 1 en cas de réessai. La réflexion coûte 2 à 3 appels. La boucle et la réflexion peuvent refuser tôt.
- **L'annexe LangGraph, non lancée.** C'est déclaré tel quel dans le rendu (`ran: False`), avec la raison : annexe optionnelle, priorité aux rendus notés. Aucun chiffre inventé.
- **`step(state, event)`.** On cherche la flèche dans la table. Absente : l'état et l'historique reviennent inchangés, avec une phrase qui nomme l'événement et l'état ; pas d'erreur, la machine reste en place. Trouvée : l'état d'arrivée est **ajouté** au bout d'une nouvelle liste. On ne reconstruit jamais l'historique, sinon on perd le compte des passages dans un état.

## Ce que je retiens

- Chaque façon d'organiser un agent a un coût en appels et des pannes propres : on les compte, on ne les devine pas.
- Une table de transitions rend impossible ce qui n'est pas déclaré : un refus ne devient jamais une réponse.
- L'historique qui ne fait que grandir permet de plafonner un réessai.

## La question de défense

> Comment empêchez-vous votre agent de répondre après avoir décidé de refuser ?

Les transitions sont une table : il n'existe aucune flèche de `refusing` vers `answering`, donc un événement « answered » dans cet état est refusé et l'état ne bouge pas. Et `done` n'a aucune flèche sortante : c'est ce qui le rend terminal.

Résultat : 300/300, rendu par la [PR #558](https://github.com/Gecko-Academy/dev3pack-submissions/pull/558).
