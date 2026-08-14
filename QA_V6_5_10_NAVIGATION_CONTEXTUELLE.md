# QA V6.5.10 — Navigation contextuelle

## Vérifications statiques

- JavaScript extrait de `index.html` : syntaxe Node valide.
- `sw.js` : syntaxe JavaScript valide.
- Release manifest : JSON valide.
- Données métier comparées à V6.5.9 : aucun changement attendu sur DB/JSON de données.

## Scénarios UX à contrôler sur appareil

1. Ouvrir une destination, scroller : le contexte destination/jour reste visible sous le header.
2. Ouvrir plusieurs blocs, utiliser `Tout réduire`, puis `Tout ouvrir`.
3. Depuis une destination, ouvrir une espèce : la fiche conserve le contexte de cette destination.
4. Changer d'onglet espèce : le libellé sticky suit la section active.
5. En fin de panneau, utiliser précédent/suivant sans remonter en haut.
6. Dans `Comprendre`, activer `Mode Lecture`, vérifier la largeur et le bouton `Quitter Lecture`.
7. Depuis une espèce, ouvrir une destination reliée : retour sur le pad correspondant.
8. Depuis une destination, ouvrir une autre étape reliée : le nouveau pad s'ouvre et vient dans la vue.
9. Vérifier que les relations affichées correspondent seulement aux espèces cibles déclarées.
10. Installer/mettre à jour la PWA et vérifier que le nouveau cache V6.5.10 remplace le V6.5.9.
