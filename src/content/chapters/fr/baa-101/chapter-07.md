---
---

## Le principe

Un agent qui répond à partir de documents ne vaut que ce que sa recherche lui apporte. Si le bon passage n'arrive pas jusqu'au modèle, aucune consigne ne sauvera la réponse.

## Pourquoi c'est important

On corrige souvent le prompt alors que la panne est en amont. Une recherche par mots rate les synonymes ; une base qui mélange les domaines ramène des passages parasites ; un passage coupé peut perdre la phrase qui répond.

## Le mécanisme

1. **Mesurer la recherche seule** : un jeu de questions avec le document attendu, et la part des questions dont le bon document arrive dans les premiers résultats.
2. **Lire ce qui revient** (manqué, hors sujet, doublon), pas seulement le score.
3. **Un seul changement à la fois**, testé aussi sur des questions jamais vues.
4. **Séparer les sources par domaine**, et vérifier qu'elles sont à jour : une source vide renvoie du vide sans erreur.
5. **Envoyer assez de contexte** : parfois le document entier plutôt qu'un fragment.

## Sur le terrain

- [Dev3Pack, Session 6](/fr/books/dev3pack/session-06/) : « vector embeddings » ne partage aucun mot avec le corpus, donc rien ne revient.
- [Dev3Pack, Session 7](/fr/books/dev3pack/session-07/) : un correctif fait passer le jeu étiqueté de 80 % à 100 %, mais fait tomber les questions inédites de 75 % à 0 % au premier résultat.
- [Dev3Pack, Final](/fr/books/dev3pack/final/) : la trace montrait que le passage qui répondait n'était jamais ramené. Le correctif : envoyer les documents retenus en entier.

## La question à se poser

> Avant d'accuser le modèle : le bon passage était-il dans ce qu'il a reçu ?
