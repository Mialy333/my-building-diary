---
---

## Le principe

Avant de stocker quoi que ce soit, on écrit ce qu'on garde, pour qui, combien de temps, et ce qu'on refuse de garder. Chaque souvenir appartient à quelqu'un.

## Pourquoi c'est important

Sans propriétaire, une mémoire fuit d'un utilisateur à l'autre. Sans limite, elle grossit sans fin. Sans politique, elle garde un secret qu'elle n'aurait jamais dû voir. Et une mémoire qui survit aux sessions contamine les tests.

## Le mécanisme

1. **La politique d'abord** : ce qu'on garde, pourquoi, comment le corriger, quand ça expire, et ce qu'on refuse (secrets, clés, données personnelles).
2. **Ranger par propriétaire** : chaque valeur sous le couple (utilisateur, clé). Un identifiant vide est refusé ; une clé absente ne renvoie rien, sans chercher ailleurs.
3. **Plafonner** : les derniers échanges seulement, et une date d'expiration.
4. **Rendre des copies**, pas l'objet stocké : sinon le lecteur devient un second écrivain.
5. **La bonne mémoire au bon agent** : distinguer la mémoire de session de la mémoire long terme, et la donner à celui qui écrit la réponse.
6. **Des tests isolés** : un identifiant explicite et une session neuve à chaque test.

## Sur le terrain

- [AWS Scholars, chapitre 2](/fr/books/aws-scholars/chapter-02/) : sans identifiant client, tous les tests écrivaient dans le même « client par défaut », et l'agent finissait par répondre à une question jamais posée.
- [AWS Scholars, chapitre 3](/fr/books/aws-scholars/chapter-03/) : la mémoire survivait au redémarrage, mais l'agent qui rédige la réponse n'y avait pas accès. Le code lui transmet maintenant l'historique.
- [Dev3Pack, Session 11](/fr/books/dev3pack/session-11/) : une mémoire rangée par propriétaire, plafonnée à cinq échanges, avec une politique écrite avant le premier enregistrement.

## La question à se poser

> À qui appartient ce souvenir, et quand disparaît-il ?
