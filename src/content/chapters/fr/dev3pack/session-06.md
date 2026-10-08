---
workedOn: 2026-10-03
---

Retrouver les bons passages d'un corpus par une recherche sur les mots, et savoir dire pourquoi elle rate quand elle rate. Si le bon passage n'arrive pas jusqu'au modèle, aucune consigne ne sauvera la réponse.

## Le concept

Pense à une GED, la gestion électronique des documents d'une banque : on cherche un dossier client par mots-clés, et un synonyme suffit à le rendre invisible.

1. Un **chargeur** qui refuse un fichier mal formé.
2. Le **découpage** des documents en passages.
3. Un **index** tag → documents.
4. Un **score** par mots communs entre la question et chaque passage.
5. **Lire ce qui revient** et poser un verdict : `good`, `missed`, `irrelevant` ou `duplicated`.

## Comment j'ai travaillé

Comme depuis la Session 4 : le code est écrit par l'assistant, testé contre la vraie check et expliqué ligne à ligne ; j'ai relancé la check moi-même avant de rendre.

## Ce que contient le rendu

- **Un chargeur qui refuse.** Un fichier vide, ou dont la première ligne n'est pas un titre `# `, lève une erreur qui nomme le fichier. Un demi-document passerait inaperçu dans les résultats. Le nom du fichier sans `.md` devient l'identifiant du document.
- **Un index trié.** Chaque tag pointe vers la liste de ses documents, triée pour que l'index soit identique sur toutes les machines.
- **Deux verdicts, lus dans la sortie.** `missed` : « vector embeddings… » ne partage aucun mot avec le corpus, donc rien ne revient. `duplicated` : pour « citations », le même document occupe deux des trois places.

Un incident de ma part : j'ai lancé `check` et `submit` depuis le dossier des rendus au lieu du dossier du cours. Le rendu s'est écrit au mauvais endroit et la branche partait vide. J'ai tout nettoyé, puis relancé depuis le bon dossier.

## Ce que je retiens

- Un score de récupération mesure des mots en commun, pas la pertinence : on lit ce qui est revenu.
- Un chargeur doit refuser plutôt que renvoyer un demi-document.

## La question de défense

> Pourquoi votre question sur les « embeddings » ne ramène-t-elle rien ?

Parce que la recherche compte les mots que la question partage avec le corpus, et qu'aucun document n'emploie ces mots-là. Ce n'est pas une panne : c'est la limite d'une recherche lexicale, qui rate les synonymes et le vocabulaire absent. D'où le verdict `missed`, posé en lisant la sortie, pas le score.

Résultat : 300/300, rendu par la [PR #556](https://github.com/Gecko-Academy/dev3pack-submissions/pull/556).
