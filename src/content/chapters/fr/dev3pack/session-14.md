---
workedOn: 2026-10-02
---

Un smoke test est un test rapide lancé juste après un déploiement, qui doit pouvoir dire « ce déploiement est mauvais ». Un service peut répondre « 200 », succès, en inventant une réponse à une requête cassée : un test qui vérifie seulement « est-ce que ça répond ? » le déclare sain.

## Le concept

Pense à la checklist d'un pilote avant le décollage. Une checklist qui répond toujours « OK » est pire que pas de checklist.

1. **Trois sondes**, toujours les mêmes : la santé du service, une vraie question, un corps de requête volontairement cassé.
2. On lit le **status**, jamais la seule présence d'une réponse.
3. Un **rapport** à quatre champs : `cold_start_ms`, `malformed_rejected`, `healthy`, `rollback`.
4. Une **phrase de retour arrière** écrite d'avance.

## Comment j'ai travaillé

Comme depuis la Session 4 : le code est écrit par l'assistant, testé contre la vraie check et expliqué ligne à ligne ; j'ai relancé la check moi-même avant de rendre. C'est d'ailleurs le premier rendu fait sous cette règle.

## Ce que contient le rendu

**`smoke(request)`**, que la check fait tourner sur quatre déploiements : `warm`, `cold`, `lax` et `killed`.

- Un `200` sur un corps cassé n'est pas un rejet : `lax` est déclaré malsain.
- `killed` renvoie aussi un corps de réponse : c'est le status qui tranche.
- Pour `cold`, le premier appel prend 1 900 ms. C'est un nombre, pas un verdict : « lent mais sain » et « rapide mais faux » sont deux faits séparés.
- La phrase de rollback doit contenir une action, un nombre et une unité, sans « would » ni « should ».

Au moment de rendre, la commande `submit --push` du cours a échoué. Elle échouait aussi avec la dernière version de `gh` : le bug venait du script du cours. Je l'ai signalé dans l'[issue #16](https://github.com/Gecko-Academy/dev3pack-cohort-2026-09/issues/16), et j'ai rendu à la main en attendant.

## Ce que je retiens

- Un bon smoke test peut échouer : c'est son rôle.
- « Lent mais sain » et « rapide mais faux » sont deux faits séparés : un nombre (le cold start) et un verdict (`healthy`).
- La phrase de rollback s'écrit avant la panne, parce qu'au moment de la panne on ne réfléchit plus.

## La question de défense

> Comment savez-vous que votre déploiement est bon ?

Je lance trois sondes : la santé, une vraie question, et un corps volontairement cassé, qui doit être refusé en 4xx. Si un seul point échoue, `healthy` passe à faux, et je redéploie la version précédente dans les 5 minutes.

Résultat : 100/100, rendu par la [PR #551](https://github.com/Gecko-Academy/dev3pack-submissions/pull/551). Limite : le smoke test n'a pas tourné sur un vrai service, seulement sur les déploiements simulés de la check.
