---
---

## Le principe

Refuser est une réponse normale du système, pas un silence ni un crash. Un refus a une forme, une raison, et il arrive le plus tôt possible.

## Pourquoi c'est important

Un échec silencieux ressemble à une vraie réponse. Un crash montre une erreur technique à l'utilisateur. Un refus tardif dépense des appels pour rien.

## Le mécanisme

1. **Refuser avant d'appeler le modèle** quand rien ne soutient la réponse : une recherche vide coûte zéro appel.
2. **Une panne devient un refus lisible** : un délai dépassé ou un fournisseur muet donnent une réponse normale, et la cause technique part dans la trace.
3. **Une entrée vide ou invalide est refusée explicitement**, jamais ignorée en silence.
4. **Un refus utile nomme ce qui manque**, en chiffres : le champ, la valeur demandée, la valeur trouvée.
5. **Un refus est marqué pour relecture humaine.** Et on mesure aussi l'autre risque : refuser ce à quoi on aurait pu répondre.

## Sur le terrain

- [Dev3Pack, Session 2](/fr/books/dev3pack/session-02/) : si le modèle ne répond pas, l'utilisateur lit « The model did not respond. », avec un délai fixé à 3 s après mesure.
- [Dev3Pack, Session 3](/fr/books/dev3pack/session-03/) : une question hors corpus est refusée sans aucun appel au modèle.
- [Dev3Pack, Session 6](/fr/books/dev3pack/session-06/) : un fichier sans titre est refusé, plutôt que de renvoyer un demi-document.
- [Dev3Pack, Gecko](/fr/books/dev3pack/gecko/) : « two espressos » est refusé sur la quantité, en nommant les deux valeurs (2 demandés, 1 préparé), et rien n'est signé.

## La question à se poser

> Quand ce système ne peut pas répondre, que voit l'utilisateur, et combien cela a-t-il coûté ?
