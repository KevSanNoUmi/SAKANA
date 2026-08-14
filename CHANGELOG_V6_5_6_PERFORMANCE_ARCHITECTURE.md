# CHANGELOG — V6.5.6 Performance architecture

Date : 2026-08-12

## Objectif

Retrouver une réactivité proche des versions plus légères sans supprimer aucune donnée ni changer un score.

## Changements

- Nouveau `app_core.json` : noyau accueil léger, sans les 501 observations.
- Nouveau `decision_cache.json` : 90 séries 30 min du voyage + agrégats de récurrence/marée, générés au build.
- Nouveau `build_runtime_cache.js` : exécute le moteur JavaScript réel dans Node pour garantir l’identité des scores.
- `pipeline.py export` régénère désormais automatiquement `app_core.json` et `decision_cache.json`.
- `data.json`, `synthesis.json`, `lure_typology.json` passent en chargement paresseux pour les fiches espèce/plans détaillés.
- Suppression du warmup global qui partait juste après l’accueil.
- Pad pré-calculé : rendu immédiat dans le même événement ; suppression du double `requestAnimationFrame`.
- Navigation Préc./Suiv. utilise elle aussi le cache build lorsque disponible.
- Service worker : cache-first + rafraîchissement silencieux pour les JSON et la navigation.
- Le corpus complet reste pré-caché best-effort à l’installation pour conserver l’usage hors ligne des fiches détaillées.

## Données

Aucun changement : 501 observations, 35 inférences, 264 intel locales, 11 espèces.

## Non-régression

Ise-Shima / Hamachi / 26-11-2026 : score 75, fenêtre 06:30–08:00, moyenne 70, proxy mouvement 0.14507225633834517.

## Cache PWA

`carnet-peche-jp-v6-5-6-performance-architecture-20260812`
