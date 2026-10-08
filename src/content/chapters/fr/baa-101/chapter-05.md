---
---

## Le principe

Ce que le modèle renvoie doit passer une frontière avant d'entrer dans le programme : un schéma fixe, et un parser strict qui l'accepte ou la rejette. Sinon, refus.

## Pourquoi c'est important

Un texte libre ne se vérifie pas : où est la source, quelle confiance ? Un modèle peut couper sa réponse, inventer un champ, reformuler une citation, ou afficher une certitude que rien ne justifie.

## Le mécanisme

1. **Un schéma** fixe la forme de la réponse : le texte, les sources citées, une confiance bornée, un drapeau de relecture humaine.
2. **Un parser strict** contrôle le format, les champs exacts (ni manquant ni en trop), les types et les bornes. Son message nomme l'erreur.
3. **Un seul retry correctif** : on renvoie au modèle son erreur. S'il échoue encore, refus signalé.
4. **Moins le modèle rédige, moins il y a à vérifier** : on peut lui faire choisir (des numéros de passages) et laisser le code recopier. Les citations découlent alors de ce qui est recopié, et ne peuvent plus être inventées.
5. **Une confiance que les sources ne justifient pas** est un signal d'alerte, pas un détail.

## Sur le terrain

- [Dev3Pack, Session 3](/fr/books/dev3pack/session-03/) : une citation numérique (`[42]`) rejetée par le parser ; un modèle entêté qui enrobe encore son JSON de prose au second essai, puis un refus signalé ; une confiance de 1.0 sur un seul document.
- [Dev3Pack, Final](/fr/books/dev3pack/final/) : après quatre retouches de prompt sans effet stable, le modèle a cessé de rédiger pour choisir des paragraphes, que le code recopie. Résultat : 9/10 à l'entraînement, puis 15/15.

## La question à se poser

> Qu'est-ce qui, dans cette réponse, a été vérifié par du code avant d'être montré ?
