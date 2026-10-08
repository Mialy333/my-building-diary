---
---

## Le principe

Ce qu'un agent dit avoir fait n'est pas une preuve. Seul l'effet observé dans le système fait foi : une ligne en base, un fichier, un diff, une transaction.

## Pourquoi c'est important

Un modèle produit un texte plausible. Il peut annoncer un ticket créé, un correctif appliqué, une vérification lancée, sans que rien de tout cela ne soit arrivé. La conversation a l'air juste, le score aussi : ni l'un ni l'autre ne regarde le système.

## Le mécanisme

1. Pour chaque action, **nommer l'effet observable** qu'elle doit laisser : une ligne, un fichier, un diff, un solde.
2. **Vérifier cet effet par un autre chemin** que l'agent lui-même : une requête en base, `git diff`, une lecture de la blockchain.
3. **Croiser** : le même identifiant doit apparaître dans la conversation et dans le système.
4. Construire le compte rendu **à partir de l'effet lu**, pas de ce que l'agent annonce.
5. Quand la règle compte, l'écrire **dans le code de l'outil**, pas seulement dans le prompt.

## Sur le terrain

- [AWS Scholars, chapitre 1](/fr/books/aws-scholars/chapter-01/) : le chatbot donnait des numéros de ticket inventés, sans jamais appeler l'outil. L'évaluation affichait 0.92 ; seul le scan de la table DynamoDB a révélé le problème.
- [Dev3Pack, Session 1](/fr/books/dev3pack/session-01/) : l'assistant de code annonçait un correctif qui n'était pas dans le fichier. `git diff` l'a montré, et un petit script l'a prouvé avant et après la correction.
- [Dev3Pack, Gecko](/fr/books/dev3pack/gecko/) : le reçu d'un achat est écrit à partir de deux lectures de la blockchain, avant et après, jamais à partir de la réponse de l'envoi.

## La question à se poser

> Où, dans le système, puis-je voir que c'est vraiment arrivé ?
