# QA — V6.5.9 Navigation & lecture

Date : 2026-08-12

## Objet

Release UX uniquement : lecture progressive dans les pads destination et navigation sticky explicite dans les fiches espèces. Aucun changement du moteur de décision, des observations, du cache de décisions, des marées, d'Evidence ou des règles matériel.

## Validation structurelle

- `python -m py_compile pipeline.py` : **OK**
- JavaScript extrait de `index.html` via `node --check` : **OK**
- `node --check sw.js` : **OK**
- `node --check build_runtime_cache.js` : **OK**
- JSON : `data.json`, `app_core.json`, `decision_cache.json`, `synthesis.json`, `lure_typology.json`, `tides_2026.json`, `manifest.webmanifest` : **OK**
- SQLite `PRAGMA integrity_check` : **ok**
- SQLite `PRAGMA foreign_key_check` : **0 erreur**

## Intégrité fonctionnelle

Comparaison binaire avec l'archive V6.5.8 source :

- `data.json` : **identique**
- `app_core.json` : **identique**
- `decision_cache.json` : **identique**
- `synthesis.json` : **identique**
- `lure_typology.json` : **identique**
- `tides_2026.json` : **identique**
- `peche_jp.db` : **identique**

La release ne modifie donc ni les 501 observations, ni les 11 espèces, ni les 35 inférences, ni les séries décisionnelles existantes.

## UX — aperçu → développement

Les pads destination gardent visibles les éléments de décision prioritaires et replient les couches explicatives :

- `Lecture destination` : synthèse avant détail ;
- `Matériel` : combos et plafond immédiatement lisibles, détail au tap ;
- `Preuves & contraintes` : volume annoncé avant ouverture ;
- `Comprendre le créneau` : score, extrema, lumière, fenêtres faibles lumières et source JMA regroupés.

Les composants utilisent `details/summary` natifs : interaction tactile et clavier sans dépendance JavaScript supplémentaire.

## UX — navigation fiche espèce

Les anciens dots ont été supprimés. La navigation est désormais textuelle et persistante :

`Terrain · Leurres · Couleurs · Animations · Comprendre`

Contrôles structurels :

- aucun ancien sélecteur `.dot-nav`, `.dot-item` ou `.dot-label` restant ;
- onglet actif exposé par `aria-selected` ;
- défilement horizontal sur petits écrans ;
- centrage automatique de l'onglet actif ;
- hauteur sticky calculée depuis le header réel via `syncStickyHeaderOffset()` ;
- recalcul au redimensionnement.

## PWA

Cache : `carnet-peche-jp-v6-5-9-navigation-lecture-20260812`.

Après déploiement : rechargement complet une fois, puis fermeture/réouverture de la PWA.
