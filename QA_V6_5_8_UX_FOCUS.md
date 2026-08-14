# QA — V6.5.8 UX focus mobile

Date : 2026-08-12

## Objet

Release UX uniquement. Elle implémente quatre demandes : tap direct sur les bandes espèces, mise en avant d'une espèce prioritaire, confiance documentaire lisible et suppression des libellés `n=…`. Aucun changement de formule, d'observation, d'inférence ou de règle matériel.

## Validation structurelle

- `python -m py_compile pipeline.py` : **OK**
- syntaxe JavaScript extraite de `index.html` via `node --check` : **OK**
- syntaxe `sw.js` : **OK**
- syntaxe `build_runtime_cache.js` : **OK**
- JSON : `data.json`, `app_core.json`, `decision_cache.json`, `synthesis.json`, `lure_typology.json`, `tides_2026.json`, `manifest.webmanifest` : **OK**
- SQLite `PRAGMA integrity_check` : **ok**
- SQLite `PRAGMA foreign_key_check` : **0 erreur**
- `build_runtime_cache.js` : **93 séries**, cache décisionnel v3, régression obligatoire conservée
- test sur copie `python pipeline.py export` : **OK** ; conserve Kashima actif, 93 séries et 28 résumés de confiance

## Intégrité des données

- observations : **501**
- espèces : **11**
- inférences : **35**
- intel locales : **264**
- doublons `claim_id` : **0**
- Hirasuzuki importé sous Suzuki : **0**
- pression atmosphérique/barométrique dans les observations : **0**
- recommandation active >50 g : **0**
- hash sémantique observations V6.5.7 → V6.5.8 : **identique** `47e5d07846f0bdeb87a4ec9c77171771d5cb481cc2500c8e837877895abef0ed`

## UX 2 — tailles d'échantillon lisibles

Les mentions visibles du type `n=6`, `n4`, etc. ont été retirées des fenêtres et de la légende des moments. Exemples rendus :

- `6 événements horaires`
- `4 cas avec marée renseignée`
- `aube 47 % · 6 cas`

Le sens statistique ne change pas : il s'agit toujours du nombre d'événements documentaires distincts utilisés par le signal concerné.

## UX 5 — interaction directe avec les bandes espèces

- premier tap sur une bande : sélection de l'espèce sans changer de page ;
- une mini-carte apparaît sous la courbe avec espèce, meilleure fenêtre, indice et confiance ;
- la bande sélectionnée reste au premier plan ;
- second tap sur la même bande : ouverture du plan détaillé existant ;
- le changement de jour réinitialise proprement la sélection.

Smoke test VM avec `app_core.json + decision_cache.json` : **OK** ; handler `focusTideSpecies` présent, mini-carte rendue, pas de dépendance au corpus lourd pour le premier tap.

## UX 9 — priorité visuelle unique

Sans sélection manuelle, l'espèce ayant le meilleur indice du jour est la seule mise au premier plan :

- bande principale : opacité complète ;
- autres bandes : atténuation légère ;
- ligne détaillée marquée `prioritaire` ;
- les autres espèces restent visibles et accessibles.

Cette priorité est purement visuelle : le tri et les scores existaient déjà et restent inchangés.

## UX 7 — confiance sans jargon

`decision_cache.json` passe en **v3** et embarque 28 résumés `pad × espèce` issus du moteur Evidence existant : qualité, événements documentés, auteurs/sources indépendantes, plateformes et groupes.

Affichage compact : `Confiance : solide · 13 événements documentés · 6 sources indépendantes`.

La fiche espèce remplace aussi l'intitulé principal `Niveau de preuve de la base` par `Confiance documentaire` et rappelle explicitement qu'un conseil terrain ou une interprétation n'est pas une prise observée.

## Non-régression décisionnelle

Ise-Shima / Hamachi / 2026-11-26 :

- score max : **75**
- fenêtre : **06:30–08:00**
- moyenne : **70**
- pic : **75**
- proxy mouvement : **0.14507225633834517**

## Performance

Le cache de confiance ajoute seulement ~2,8 Ko au cache décisionnel :

- `app_core.json` : **40 589 octets**
- `decision_cache.json` : **118 366 octets**
- `tides_2026.json` : **16 232 octets**
- JSON bloquant total : **175 187 octets**

Benchmark Node VM de `stopDetail` Ise-Shima, 100 passages avec cache décisionnel :

- V6.5.7 médiane : **0,927 ms**
- V6.5.8 médiane : **0,932 ms**

Différence négligeable sur ce banc ; ce n'est pas une mesure iPhone.

## Voyage / pads

- pads visibles : **7**
- jours visibles couverts JMA : **23/23**
- séries décisionnelles : **93/93**
- Kashima reste actif le **4 décembre 2026** avec Hirame / Suzuki / Hamachi.

## PWA

Cache : `carnet-peche-jp-v6-5-8-ux-focus-20260812`.

Après GitHub Pages : recharger une fois puis fermer/réouvrir la PWA. Contrôle téléphone recommandé : ouvrir Kashima ou Ise-Shima, vérifier l'espèce prioritaire, toucher une autre bande une fois puis une seconde fois, et changer de jour avec Préc./Suiv.
