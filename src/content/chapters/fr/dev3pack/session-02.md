---
workedOn: 2026-09-26
---

Parler à n'importe quel modèle par une seule porte, et rester debout quand il ne répond pas. Sans porte unique, changer de fournisseur oblige à réécrire l'agent ; sans gestion d'erreur, une panne réseau devient un crash que l'utilisateur voit.

## Le concept

Pense à une prise électrique normalisée : l'appareil ne sait pas quelle centrale produit le courant. Et à un disjoncteur : si le courant manque, on coupe proprement au lieu de griller l'appareil.

1. Une seule méthode, `complete(system, user) -> str`, que tout modèle doit avoir : c'est la **seam**, la couture entre l'agent et le modèle.
2. Le fichier `.env` choisit la **lane** : faux modèle, Ollama en local, ou cloud. Le preflight vérifie qu'elle répond, sinon il retombe sur le faux modèle.
3. L'appel au modèle est entouré d'un `try/except` qui attrape `TimeoutError` et `OllamaError`.
4. En cas d'échec, la fonction renvoie quand même une réponse normale : un **refus**, sans citation, confiance 0, marqué pour relecture humaine.
5. La cause technique part dans la **trace**, le journal du run, pas dans la réponse.

## Ce que j'ai fait

- **Brancher un vrai modèle.** Ollama avec `qwen2.5:7b-instruct`, en local. Serveur éteint, le preflight retombait sur le faux modèle et le disait, sans planter. Serveur démarré : `LIVE is the ollama lane`.
- **Une consigne fausse, signalée.** Le premier exercice annonçait qu'une question contenant « hello » et « agent » renverrait la réponse « agent ». Elle renvoyait « hello ». En lisant le code du faux modèle, j'ai vu qu'il rend la première clé trouvée dans l'ordre d'insertion : la règle est juste, la phrase de la consigne ne l'est pas. Je l'ai signalé dans l'[issue #15](https://github.com/Gecko-Academy/dev3pack-cohort-2026-09/issues/15) du cours.
- **Deux lanes, une même question.** Faux modèle : similarité 1,00 avec la réponse attendue. Qwen : 0,62, pour deux réponses de même sens. Ce chiffre mesure des caractères, pas du sens : « is » et « is not » scoreraient haut. D'où l'évaluation par propriétés, plus tard dans le cours.
- **Ma barre de fiabilité.** Trois critères vérifiables par oui ou non : la source citée reste la même ; relecture humaine si la réponse recommande de déplacer des fonds, d'approuver un spender ou de changer de réseau ; jamais sans validation, signer ou diffuser une transaction, ou envoyer vers une adresse nouvelle. Limite assumée : une réponse constante n'est pas forcément juste.
- **`answer_with_timeout`, ma cellule.** `try/except (TimeoutError, OllamaError)`, refus sans citation, confiance 0, relecture humaine, et l'erreur consignée dans la trace. Piège rencontré : mon bloc de test, mal indenté, s'était retrouvé à l'intérieur de la fonction.
- **Un délai mesuré, pas deviné.** Avec `time.monotonic` : 1,9 s au premier appel, 0,3 s ensuite. J'ai fixé le délai à 3 s. Le démarrage à froid du serveur, lui, n'est pas mesuré.

Un trou connu en fin de session : ma fonction ne gérait que l'échec. Le chemin où le modèle répond est le sujet de la session 3.

## Ce que je retiens

- Une seule méthode pour parler à tous les modèles : on change de fournisseur sans toucher à l'agent.
- Une panne devient un refus lisible ; la cause technique va dans la trace.
- On fixe un seuil après l'avoir mesuré, pas au jugé.

## La question de défense

> Que voit l'utilisateur si le modèle ne répond pas ?

Un refus lisible, « The model did not respond. », sans citation et marqué pour relecture humaine. La cause est dans la trace, parce que l'adapter ne distingue pas lenteur et absence de serveur. Et mon délai de 3 s vient d'une mesure : 1,9 s, puis 0,3 s.

Résultat : 400/400, rendu par la [PR #373](https://github.com/Gecko-Academy/dev3pack-submissions/pull/373).
