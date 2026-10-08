---
workedOn: 2026-09-25
---

Un assistant de code peut annoncer « c'est fait » alors que ce n'est pas vrai. Cette première session apprend à le faire travailler sur un vrai projet, sans le croire sur parole.

## Le concept

Pense à un analyste junior qui prépare une note d'investissement. On valide son plan avant qu'il commence, on relit ses chiffres après, et on ne signe jamais une note qu'on n'a pas vérifiée. Avec un assistant de code, c'est la même boucle :

1. Des **instructions de projet** (`AGENTS.md`) lui donnent les règles du repo.
2. Il propose un **plan**, sans rien modifier.
3. Il fait la **plus petite modification**, approuvée une par une.
4. Je **teste** avec mes propres commandes.
5. Je **relis le diff**, la liste exacte des lignes changées, et je refuse ce qui ne va pas.

## Ce que j'ai fait

Le changement demandé : un filtre `tags` dans `tools.py`, appliqué après la récupération des documents.

- **Le plan.** Un seul fichier. Choix posés : un document passe s'il porte au moins un des tags, filtre après récupération, casse exacte, plafond de résultats conservé.
- **Premier refus, sur le plan.** La vérification proposée, `bootcamp check ch04`, ne prouvait rien : ch04 n'était pas encore fait et ne teste pas `search_documents`.
- **Deuxième refus, sur le code.** Avec `tags=[]`, la fonction passait les contrôles puis vidait les résultats en silence : un échec qui ressemble à une vraie réponse.
- **La preuve.** L'assistant disait avoir corrigé. `git diff` a montré que non. Un petit script l'a prouvé avant la correction, puis après. Résultat : un fichier, +23/−2, lint vert.
- **Un script jamais relu.** J'ai refusé d'exécuter un script de vérification écrit par l'assistant que je n'avais pas lu.
- **Le résumé des risques.** Deux risques réels, et deux affirmations fausses : « aucune vérification n'a tourné », et « tu es sur `main` » alors que j'étais sur une branche de travail.

Le motif qui revient : l'assistant affirme un état (correctif, tests, branche) sans l'avoir vérifié.

## Ce que je retiens

- L'assistant peut affirmer quelque chose de faux. Seuls le diff et mes commandes font foi.
- Un refus argumenté est la preuve que j'ai vraiment relu.
- Une entrée vide doit être refusée, jamais ignorée en silence.

J'en ai fait une règle dans mon `AGENTS.md` : ne jamais affirmer un correctif, une vérification ou un état du repo sans l'avoir vérifié.

## La question de défense

> Quel changement as-tu refusé, et pourquoi ?

J'ai refusé une version où `tags=[]` renvoyait « aucun résultat » en silence : un échec qui ressemble à une vraie réponse. L'assistant disait l'avoir corrigée ; `git diff` a montré que non, et mon script l'a prouvé avant et après la correction.

Résultat : 100/100, rendu par la [PR #349](https://github.com/Gecko-Academy/dev3pack-submissions/pull/349).
