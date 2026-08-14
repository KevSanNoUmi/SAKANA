# CHANGELOG — V6.5.5 Enrichissement comportemental

Date : 2026-08-12

## Données

- Intégration du batch 3 après audit et curation détaillée.
- 21 transcriptions brutes archivées en deux sous-dossiers pour éviter les collisions de noms avec les lots précédents.
- 30 nouvelles observations importées.
- 18 nouvelles interprétations importées séparément dans `inferences`.
- Corpus : 501 observations / 35 inférences / 264 intel locales / 11 espèces.

### Événements positifs

- Suzuki : +2 captures confirmées, Miyagi.
- Hirame : +3 captures confirmées.
- Hamachi : +0 capture ; uniquement des méthodes 青物 explicitement compatibles Wakashi/Inada/Warasa/Buri.

### Événements non positifs

- 3 Suzuki décrochés + 1 touche Suzuki conservés comme événements terrain.
- `metadata.outcome=lost|bite` est désormais lu par `observationPolarity()` : ces événements ne peuvent pas renforcer une récurrence positive.

## Comportement / plan B

- Suzuki : courant fort → contrôle du fond + lift-and-fall ; courant plus faible → alléger et ralentir juste au-dessus du fond.
- Hirame : distinction renforcée entre marée astronomique prévue et courant réellement ressenti au fond ; valeur des structures proches du bord.
- Hamachi : méthode de recherche de couche par countdown fond puis paliers (ex. 8 → 5 → 3 → 1), sans création de preuve de présence.
- Les conclusions horaires/marée de la source expert Hirame restent dans `inferences`, hors récurrence et hors scoring.

## Pipeline

- `_research_tags()` conserve désormais les champs de staging utiles `spot_type`, `comportement`, `profondeur`, `temperature_eau`, `couleur_eau`, `observation` et une saison explicite.
- Les recommandations de familles génériques ne sont pas transformées artificiellement en poids exact de 50 g.
- Les modèles non résolus restent non actionnables.

## Front / PWA

- `observationPolarity()` tient compte de `metadata.outcome` pour les événements curatés.
- Aucun changement de formule de fenêtre, de courbe JMA ou de géométrie V6.5.4.
- Cache PWA : `carnet-peche-jp-v6-5-5-behavioral-enrichment-20260812`.
