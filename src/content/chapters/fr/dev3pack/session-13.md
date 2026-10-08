---
workedOn: 2026-10-03
---

Un outil qui va chercher des URL doit décider sur la chaîne de caractères, avant toute requête, si l'adresse est autorisée. Et chaque action se fait au niveau le plus bas qui suffit. Sinon, on peut le piloter vers le réseau interne ou vers l'adresse qui distribue les identifiants du cloud (une attaque SSRF), ou une démo devient une dépense réelle sans que personne l'ait décidé.

## Le concept

Pense à la liste des contreparties autorisées d'une salle de marché. On vérifie la contrepartie avant d'envoyer l'ordre, pas après, et certains ordres ne passent jamais depuis un compte de démonstration.

1. Une règle sur le **protocole** : http ou https.
2. Une règle sur l'**adresse** : privée, locale, ou `127.0.0.1` déguisé en un seul nombre.
3. Une **liste de domaines autorisés**, et leurs sous-domaines.
4. Le **niveau le plus bas** pour chaque action : enregistrement, lecture publique, fork, jamais.
5. Une **attestation honnête** de ce qu'on a fait.

## Comment j'ai travaillé

La garde d'URL et les niveaux ont été écrits par l'assistant, testés contre la vraie check et expliqués ligne à ligne. L'attestation, elle, est de moi : l'assistant a refusé de la cocher à ma place.

J'ai répondu aux questions moi-même : je n'ai jamais saisi de clé, de phrase de récupération ou de donnée de paiement, et je n'ai commité aucune URL hébergée. J'ai coché deux cases de plus après avoir compris ce qu'elles couvraient. J'ai déclaré ne pas avoir lancé le niveau fork (`ran_the_fork_lane = False`). La phrase finale ne dit que ce qui est prouvé : des lectures par `curl`, une adresse jetable, aucune clé.

## Ce que contient le rendu

**`fetch_guard`**, testé sur les 31 URL de la check, où la raison du verdict compte autant que le verdict.

- `urlsplit(url).hostname` lit l'hôte réel : dans `https://example.com@evil.net/`, c'est `evil.net`.
- L'adresse est lue sous toutes ses formes : écrite normalement, en hexadécimal, ou en un seul nombre. `2130706433`, c'est `127.0.0.1`.
- Une adresse privée, locale, ou `169.254.169.254` (celle des identifiants du cloud) est refusée : `not-public`.
- `host.endswith("." + domain)` : le point empêche `evil-example.com` de passer pour `example.com`.
- Aucune exception ne sort : chaque URL reçoit un verdict et une raison.

## Ce que je retiens

- On décide avant d'ouvrir la connexion, jamais après.
- Une adresse peut se déguiser ; on la lit avec un analyseur, pas à l'œil.
- Une attestation se coche seulement si elle est vraie ; « non » est une réponse honnête.

## La question de défense

> Votre démo aurait-elle pu dépenser de l'argent ?

Non : je n'ai utilisé que des enregistrements et des lectures publiques, avec une adresse jetable et aucune clé privée nulle part, donc rien ne pouvait signer. Signer n'est possible que sur un fork, que je n'ai pas lancé, et dépenser sur mainnet n'est permis à aucun niveau.

Résultat : 300/300, rendu par la [PR #561](https://github.com/Gecko-Academy/dev3pack-submissions/pull/561).
