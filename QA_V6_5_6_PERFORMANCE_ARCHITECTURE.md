# QA — V6.5.6 Performance architecture

Date : 2026-08-12

## Validation structurelle

- `python -m py_compile pipeline.py` : OK
- syntaxe JavaScript `index.html` via `node --check` : OK
- syntaxe `sw.js` via `node --check` : OK
- JSON : `data.json`, `app_core.json`, `decision_cache.json`, `synthesis.json`, `lure_typology.json`, `tides_2026.json`, `manifest.webmanifest` : OK
- SQLite `PRAGMA integrity_check` : `ok`
- SQLite `PRAGMA foreign_key_check` : 0 erreur
- `python pipeline.py export` : OK ; régénère automatiquement les caches runtime

## Intégrité des données

- observations : **501**
- espèces : **11**
- inférences : **35**
- intel locales : **264**
- doublons `claim_id` : **0**
- mention Hirasuzuki importée sous Suzuki : **0**
- pression atmosphérique/barométrique dans moteur/données : **0**
- recommandation active >50 g : **0**
- couverture JMA des jours visibles du voyage : **100 %**
- hash sémantique de la liste `observations` identique V6.5.5 → V6.5.6 : `08bd8cf837220c38bcc513289ffe198478972f718c697a62c69d0f2abc6ba71a`

## Non-régression décisionnelle

- Ise-Shima / Hamachi / 2026-11-26
- score max : **75**
- fenêtre : **06:30–08:00**
- moyenne fenêtre : **70**
- pic : **75**
- proxy mouvement du pic : **0.14507225633834517**

Tous les 6 pads visibles ont leur série décisionnelle embarquée pour chaque jour/espèce cible.

## Réduction du travail au démarrage

Fichiers JSON nécessaires avant le premier rendu :

- V6.5.5 : `data.json + synthesis.json + lure_typology.json + tides_2026.json` = **887 880 octets**
- V6.5.6 : `app_core.json + decision_cache.json + tides_2026.json` = **168 787 octets**
- réduction brute : **81,0 %** (avant compression HTTP).

Le premier rendu ne parse plus les 501 observations, ne lance plus `hydrateTypologies()` sur le corpus complet et ne lance plus de warmup massif après 24 ms.

Benchmark de référence **Node VM uniquement** (25 passages froids de `stopDetail` Ise-Shima ; ce n'est pas une mesure iPhone) :

- V6.5.5 médiane : **14,18 ms**
- V6.5.6 médiane : **2,92 ms**
- facteur observé dans ce banc : **~4,86×**

## Chargement paresseux

- accueil + pads : aucun besoin de `data.json` complet ;
- fiche espèce : `ensureFullData()` charge en parallèle `data.json`, `synthesis.json`, `lure_typology.json` ;
- plan détaillé de fenêtre : même chargement paresseux avant Evidence/leurres/animations ;
- après chargement complet, les caches décisionnels build sont réhydratés afin de ne pas recalculer les fenêtres.

## Service worker

Cache : `carnet-peche-jp-v6-5-6-performance-architecture-20260812`.

Critiques : index, `app_core.json`, `decision_cache.json`, `tides_2026.json`. Corpus complet : pré-cache best-effort, non bloquant pour le rendu. Les JSON sont servis cache-first avec rafraîchissement réseau silencieux.

## Contrôle téléphone recommandé après GitHub Pages

Recharger une fois pour activer le nouveau SW, fermer/réouvrir la PWA, puis tester ouverture/fermeture de Kobe, Ise-Shima, Numazu, Préc./Suiv., une fiche espèce, puis un plan détaillé. Les pads doivent s'ouvrir sans le message « calcul des fenêtres ».
