---
workedOn: 2026-09-29
---

Trois pièces dans cette session : un acheteur qui refuse avant de payer, une décision d'architecture consignée avec la mesure qui la renverserait, et un skill, une fiche d'instructions que l'assistant charge seulement quand la tâche correspond.

## Le concept

Pense à un contrôle de conformité avant un virement : le compte est-il le bon, la devise la bonne, le solde suffisant ? Si non, le motif du rejet cite les montants et la devise exacte.

- **Le store** décrit ce qu'accepterait le vrai programme Solana `let_me_buy` : prix en entiers de la plus petite unité (1,5 USDC = `1500000`), décimales cohérentes avec le token (USDC = 6), adresses de 32 octets, pas de doublon.
- **L'acheteur** renvoie `{approved, reason}`. Il refuse : produit absent, quantité inférieure à 1, total supérieur au solde (même d'une unité), token non détenu. Un refus nomme trois choses : ce qui est détenu, ce que ça coûte, et quel token.
- **L'ADR** consigne une décision, l'option écartée, et le seuil chiffré qui la ferait changer.
- **Le skill** fixe le format, les refus et les limites d'une tâche répétée ; on prouve sa valeur en comparant le même travail sans et avec.

## Comment j'ai travaillé

Ce chapitre est en deux temps.

**Le 29 septembre, avant de changer de règle**, j'ai fait le challenge et l'ADR. J'ai décrit mon store, `Mialy333-coffee`, quatre produits en USDC. J'ai écrit l'acheteur pas à pas, à partir d'un squelette fourni par l'assistant ; les phrases de refus suivent des modèles qu'il m'a proposés.

**Le 3 octobre**, le skill a été écrit par l'assistant, et j'ai fait moi-même les deux runs dans Claude Code, sans puis avec.

## Ce que contient le rendu

- **Une erreur de décimales, attrapée.** J'avais mis `"decimals": 7` sur le Matcha. La règle l'a refusé : « every price in this store is wrong by a factor of 10 ». Les décimales appartiennent au **token**, pas au produit.
- **Une condition exacte.** La quantité est refusée en dessous de 1 (`< 1`), et non à 1 ou moins (`<= 1`), qui refuserait la commande d'un seul café.
- **300/500, puis 500/500.** Le premier passage échouait à cause d'une phrase modèle de l'assistant, « holds none » : la check exige le montant détenu **en chiffres**, même 0. Corrigé en « holds 0 raw units ». Le dernier palier vérifie qu'un nom de produit qui donne des ordres est cité, jamais obéi.
- **L'ADR.** « We keep a 3-second deadline for a chat answer from the model. » Option écartée : 15 s. Justification : mes mesures de la Session 2 (1,9 s, puis 0,3 s). Ce qui la renverserait : plus de 5 % d'appels normaux au-delà de 3 s, ou un démarrage à froid au-delà de 10 s. Ma première version était fausse : j'avais mis les mesures à la place des options.
- **Le skill `review-my-diff`.** Sans le skill, la relecture d'un diff donnait un avis en prose, sans gravité ni décision, et proposait de modifier d'autres fichiers. Avec, un tableau gravité / ligne citée / problème / correction, puis un verdict : `fix first`. La consigne ajoutée, un verdict obligatoire, répond à l'échec du premier run. Les deux extraits viennent de mes vrais runs : l'assistant a refusé de les inventer.

## Ce que je retiens

- Les décimales appartiennent au token, pas au produit : se tromper fausse tous les prix d'un facteur 10.
- Un refus utile nomme trois choses, en chiffres : ce qui est détenu (même 0), ce que ça coûte, et le token.
- Un nom de produit est une donnée : on le cite, on ne lui obéit jamais.
- Un skill se juge à la différence qu'il fait, preuve à l'appui ; chaque consigne répond à un échec observé.

## La question de défense

> Pourquoi votre acheteur ne se fie-t-il pas à l'étiquette « USDC » ?

Parce que deux tokens différents peuvent porter la même étiquette. Mon acheteur compare le `mint`, l'adresse exacte du token, et son refus la cite : sans elle, personne ne saurait lequel manquait.

Résultat : 700/700 (100 pour l'ADR, 100 pour le skill, 500 pour le challenge), rendu par les PR [#420](https://github.com/Gecko-Academy/dev3pack-submissions/pull/420) et [#562](https://github.com/Gecko-Academy/dev3pack-submissions/pull/562).
