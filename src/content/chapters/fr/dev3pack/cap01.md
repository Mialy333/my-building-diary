---
workedOn: 2026-10-02
---

On fait tourner l'assistant de recherche de référence du cours, on vérifie qu'il passe quatre portes, puis on liste honnêtement ce qu'il fait encore mal. Passer ses tests ne veut pas dire être sans défaut : nommer ses limites avant la démo évite de les découvrir sur scène.

## Le concept

Pense à un contrôle des ordres de bourse testé seulement avec des ordres parfaits, rédigés par soi. « Conforme » ne dit rien d'un vrai trader pressé qui se trompe de ticker.

Le circuit de l'agent : question → récupération → refus précoce si rien n'est trouvé → prompt → modèle → parser → vérification des citations → résultat. Les quatre portes :

1. une réponse citée, citation vérifiée ;
2. un refus avant tout appel au modèle ;
3. une trace lisible ;
4. la porte d'évaluation sur le golden set.

La cinquième étape : la liste des problèmes, classée par impact.

## Comment j'ai travaillé

Les quatre portes étaient déjà écrites : je les ai exécutées. La cinquième, la liste classée, est de moi.

La check l'a d'abord refusée : « every issue needs a sentence, not a placeholder ». J'ai demandé à l'assistant d'écrire les phrases ; il a refusé, puisque c'était encore ma règle, et m'a donné un squelette à trous. J'ai écrit les rangs 2 et 3 moi-même, en plusieurs reformulations. L'assistant a seulement corrigé un mot inexact (« outside tools »). Le rang 1 reprend l'exemple du cours.

Avant de commencer, il fallait aussi mettre à jour le repo du cours sans perdre mon travail : branche de sauvegarde, mise à jour en fast-forward, puis restauration ciblée de mes fichiers.

## Ce que contient le rendu

- **Rang 2.** La porte d'évaluation tourne sur un faux modèle, donc elle ne montre ni hallucinations ni mauvaises réponses. Impact : le rapport reste vert alors que personne ne voit les erreurs.
- **Rang 3.** Un vrai modèle passe par le réseau, peut ne jamais répondre, et il n'y a pas de timeout. Impact : l'utilisateur attend sans réponse ni message d'erreur.

C'est l'impact pour l'utilisateur qui fixe le rang, pas la difficulté technique.

## Ce que je retiens

- Un test vert sur un faux modèle prouve la tuyauterie, pas la qualité des réponses.
- Un appel réseau sans timeout peut bloquer l'utilisateur sans fin, et sans message d'erreur.
- C'est l'impact pour l'utilisateur qui décide du rang d'un problème.

## La question de défense

> Votre évaluation est verte : votre agent est-il fiable ?

Pas encore prouvé : ce vert vient d'un faux modèle scripté, il montre que le circuit fonctionne quand le modèle répond parfaitement. Avec un vrai modèle, il faut mesurer les mauvaises réponses et borner l'attente par un timeout, ce que j'ai classé en rangs 2 et 3.

Résultat : 500/500, rendu par la [PR #545](https://github.com/Gecko-Academy/dev3pack-submissions/pull/545).
