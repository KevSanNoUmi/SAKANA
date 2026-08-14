# V6.5.4 — Lisibilité mobile

Date : 2026-08-12

## Objectif

Améliorer la lecture sur petit écran des périodes d’activité par espèce affichées au-dessus de la courbe de marée, sans toucher au moteur de décision.

## Modifications

- bandes espèce : hauteur SVG `4 → 10` (≈ ×2,5) ;
- pas vertical : `6 → 12` ;
- hauteur du composant : 108 px par défaut, 116 px sur écran ≤430 px ;
- zone tactile alignée sur la nouvelle épaisseur ;
- libellé espèce légèrement renforcé avec contour sombre ;
- cache PWA incrémenté : `carnet-peche-jp-v6-5-4-mobile-readability-20260812`.

## Non-modifié

- données ;
- récurrence positive ;
- Evidence ;
- scoring des fenêtres ;
- granularité 30 min ;
- interpolation de marée ;
- performance/caches métier V6.5.1 ;
- plafond matériel 50 g.
