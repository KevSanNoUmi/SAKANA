# QA — V6.5.3 Enrichissement P0

Date : 2026-08-12

## Validation statique

- `python -m py_compile pipeline.py` : **OK**.
- JavaScript extrait de `index.html` : `node --check` **OK**.
- `sw.js` : `node --check` **OK**.
- JSON : `data.json`, `tides_2026.json`, `synthesis.json`, `lure_typology.json`, `manifest.webmanifest`, curation et staging : **OK**.

## SQLite / intégrité

- `PRAGMA integrity_check` : **ok**.
- `PRAGMA foreign_key_check` : **0 erreur**.
- doublons `canonical_hash` : **0**.
- observations : **471**, toutes validées.
- inférences : **17**, hors preuves.
- intelligence locale : **264**.
- pression atmosphérique dans le front/scoring : **0**.
- Hirasuzuki explicitement rangé sous Suzuki : **0**.
- recommandation active explicitement >50 g : **0**.

## Distribution

- Suzuki : 116
- Hirame : 113
- Hamachi : 83
- Aori-Ika : 79
- Kurodai : 34
- Hirasuzuki : 17
- Tachiuo : 16
- Madai : 9
- Saba : 2
- Aji : 1
- Mebaru : 1

## Curation P0

- 31 observations importées depuis la curation P0.
- 9 interprétations importées vers `inferences`.
- 13 transcriptions brutes conservées dans le dépôt.
- `event_id` présent sur les observations P0 afin de dédupliquer plusieurs faits du même événement.
- Bone Bait / tête 18 g : la recommandation de modèle est bien filtrée `UNKNOWN_WEIGHT_MODEL`; `jighead_weight_g=18`, `total_cast_weight_g=null`.
- Les éléments `UNRESOLVED` ne sont pas importés comme recommandations actives.

## Dates / marées / pads

- 5 destinations de voyage, 6 pads affichés car Fukuoka est scindé en deux secteurs.
- Shizuoka et Kashima restent contextes de recherche, non pads de voyage.
- couverture marée de tous les jours affichables : **100 %**.

## Test de non-régression fenêtre

Ise-Shima / Hamachi / 26 novembre 2026 :

- maximum : **75** ;
- fenêtre : **06:30–08:00** ;
- moyenne : **70** ;
- moment du pic : **aube** ;
- phase au pic : **étale** ;
- proxy de variation de niveau : **0.14507225633834517**.

La référence V6.5.1 est donc conservée.

## Vérification manuelle mobile

La passe statique et moteur est validée. Une vérification réelle sur iPhone reste recommandée après déploiement GitHub Pages : ouvrir/fermer Ise-Shima plusieurs fois, naviguer entre les jours, ouvrir un plan Hamachi, puis tester Tokyo/Suzuki et la fiche Madai après mise à jour du service worker.
