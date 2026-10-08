---
workedOn: 2026-10-03
---

On mesure d'abord si la bonne page arrive au modèle, puis si la réponse cite vraiment la page qui la soutient. Un chiffre qui monte peut cacher une régression ailleurs, et une évaluation qu'on n'a jamais attaquée peut être trompée par un modèle qui triche.

## Le concept

Pense à un backtest. Une stratégie optimisée sur les mêmes données que celles qui la notent paraît excellente, puis échoue hors échantillon.

1. Un **jeu étiqueté** : question → document attendu.
2. Le **hit rate @k** : la part des questions dont le bon document est dans les k premiers résultats.
3. **Un seul changement**, puis on remesure.
4. On le teste sur des **questions jamais vues**.
5. On **attaque son évaluateur** avec un faux modèle tricheur.

## Comment j'ai travaillé

Comme depuis la Session 4 : le code et les phrases sont écrits par l'assistant, testés contre la vraie check et expliqués ; j'ai relancé la check moi-même avant de rendre.

## Ce que contient le rendu

- **Une reformulation qui rate.** « How do I cut a long text into smaller pieces before looking things up in it? » garde le sens (le découpage en passages) mais change tous les mots. Le moteur ramène trois documents, jamais celui sur le RAG : sans mot partagé, il ne trouve pas.
- **Une amélioration et une régression, chiffrées.** L'expansion de requête fait passer le hit rate de 80 % à 100 % sur le jeu étiqueté. Sur quatre questions inédites, @1 tombe de 75 % à 0 %, et @3 de 75 % à 50 %. La règle ajoutait des mots à toute question contenant « instructions » : elle répare un cas et casse les autres.
- **Le score du tricheur.** Un faux modèle qui cite toujours le même document obtient 50 % (4 sur 8) : trois refus gratuits, et un faux positif, avec la bonne citation et une phrase bidon. La faiblesse de l'évaluateur : il vérifie l'identifiant cité, pas que le texte de la réponse vient du document.

## Ce que je retiens

- Un chiffre mesuré sur les cas qu'on a corrigés n'est pas une preuve : il faut des cas inédits.
- Un rapport honnête donne l'amélioration et la régression, avec leurs chiffres.
- Une évaluation se teste en essayant de la tromper.

## La question de défense

> Votre évaluation est à 100 %, pourquoi s'en méfier ?

Parce qu'un faux modèle qui cite toujours le même document obtient déjà 50 % : les refus sont gratuits, et une citation juste peut accompagner une phrase inventée. Il faut vérifier que la réponse est soutenue par le passage cité, pas seulement que l'identifiant est le bon.

Résultat : 300/300, rendu par la [PR #557](https://github.com/Gecko-Academy/dev3pack-submissions/pull/557).
