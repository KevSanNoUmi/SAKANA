# V6.5.9 — Navigation & lecture

Date : 2026-08-12

## Objet

Release UX uniquement. Aucun changement du moteur de décision, des scores, des observations, des règles Evidence, des marées ou du plafond matériel.

## 1. Aperçu → développement

Les zones riches des pads destination sont maintenant organisées en lecture progressive :

- `Lecture destination` affiche d'abord une synthèse courte puis développe tendance, spots, timing et typicité au tap ;
- `Matériel` expose immédiatement les combos concernés et le plafond 50 g, puis le détail du loadout ;
- `Preuves & contraintes` indique le volume disponible avant d'ouvrir les signaux prioritaires ;
- la justification détaillée du créneau (`score`, extrema, lumière, fenêtres faibles lumières, source JMA) est regroupée sous `Comprendre le créneau`.

Les informations de décision principales restent visibles : courbe, espèce prioritaire, jours du séjour et fenêtres espèce.

## 2. Fiches espèces — navigation sticky

Les anciens dots sont remplacés par cinq onglets textuels :

`Terrain · Leurres · Couleurs · Animations · Comprendre`

La barre :

- reste visible sous le header pendant le scroll ;
- défile horizontalement sur petits écrans ;
- centre automatiquement l'onglet actif ;
- indique explicitement la section courante ;
- revient au début de la zone de contenu lorsque l'utilisateur change d'onglet après avoir beaucoup scrollé.

La position sticky est calculée à partir de la hauteur réelle du header pour éviter les recouvrements selon l'écran ou le nom de l'espèce.

## PWA

Nouveau cache : `carnet-peche-jp-v6-5-9-navigation-lecture-20260812`.
