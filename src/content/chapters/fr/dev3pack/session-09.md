---
workedOn: 2026-10-03
---

Tracer ce que l'agent a fait, ranger chaque échec dans un seau, et ne garder aucun secret dans les traces. Sans trace, on corrige au hasard ; avec une trace qui contient une clé, on fabrique une fuite.

## Le concept

Pense au journal d'audit d'une salle de marché : chaque ordre est tracé, mais les codes d'accès n'y figurent jamais.

1. Une **trace ordonnée** : `retrieve`, `llm_call`, `decision`.
2. Quatre **seaux** d'échec : `retrieval`, `tool_selection`, `instruction_following`, `formatting`.
3. On corrige **le plus gros seau d'abord**.
4. On **masque les secrets** avant d'écrire la trace.

## Comment j'ai travaillé

Comme depuis la Session 4 : le code est écrit par l'assistant, testé contre la vraie check et expliqué ligne à ligne ; j'ai relancé la check moi-même avant de rendre.

## Ce que contient le rendu

- **Une panne classée d'après la trace.** La trace montre `retrieve → rag-basics`, puis une réponse avec des citations vides. La recherche a trouvé le bon document ; le modèle ne s'en est pas servi. Le seau est donc `instruction_following`, pas `retrieval` : deux corrections opposées.
- **`redact`, le masquage.**
  - Une valeur qui n'est pas du texte est recopiée telle quelle : rien à chercher, et la fonction ne plante jamais.
  - Chaque motif déclaré (clé API, token, e-mail) remplace **chaque** occurrence par `[redacted:<type>:<empreinte>]`.
  - L'empreinte, 8 caractères d'un hachage, est la même pour le même secret : on suit une clé à travers les logs sans jamais la lire.
  - Le piège : en Python, sans `label=label` dans la petite fonction de remplacement, toutes les étiquettes porteraient le dernier type de la boucle.

## Ce que je retiens

- C'est la trace qui dit où est la panne : recherche ou modèle, deux corrections opposées.
- On masque un secret en le remplaçant, jamais en le supprimant : un trou ressemble à une absence.
- Même secret, même étiquette : on peut suivre une clé sans la lire.

## La question de défense

> Votre trace peut-elle fuiter une clé ?

Non : avant d'écrire un événement, je remplace clés, tokens et e-mails par une étiquette avec une empreinte, et je laisse tout le reste intact. On voit qu'un secret était là, sans pouvoir le lire.

Résultat : 200/200, rendu par la [PR #554](https://github.com/Gecko-Academy/dev3pack-submissions/pull/554).
