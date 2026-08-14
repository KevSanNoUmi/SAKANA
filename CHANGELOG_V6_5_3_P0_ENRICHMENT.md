# CHANGELOG — V6.5.3 Enrichissement P0

Date : 2026-08-12

## Données

- Import de la curation P0 du deuxième lot de transcriptions : **31 faits directs**.
- Ajout de **9 interprétations** dans `inferences`, hors moteur de preuve.
- Corpus : **471 observations / 11 espèces / 264 intel locales / 17 inférences**.
- Distribution mise à jour : Suzuki 116, Hirame 113, Hamachi 83, Aori-Ika 79, Kurodai 34, Hirasuzuki 17, Tachiuo 16, Madai 9, Saba 2, Aji 1, Mebaru 1.
- Madai : deux captures shore vidéo intégrées avec lecture bait/courant/cassure/couche.
- Suzuki : nouvelles séquences sur recherche de couche, eau froide, fond malgré bait haut et tension-fall près des structures.
- Hirame : import différentiel des micro-positions wando/sandbar, sans recréer les généralités déjà présentes.
- Saba : une capture de juin conservée comme signal écosystème ; elle ne devient pas une règle saisonnière du voyage.

## Intégrité / staging

- `metadata.event_id` devient prioritaire pour le dédoublonnage des voix de récurrence et Evidence.
- `metadata.exclude_presence_evidence` empêche une explication/méthode technique de gonfler artificiellement la preuve de présence.
- La hiérarchie Evidence exploite `metadata.source_identity` lorsqu'il est disponible, avec fallback historique.
- `pipeline.py import-research` conserve désormais simultanément les tags de recherche et les métadonnées riches du staging.
- Un `source_kind` peut être promu vers `video_catch` si une capture directe apparaît plus loin dans la même source.
- Bone Bait + tête 18 g : **18 g est la tête plombée**, pas le poids total lancé. Le modèle reste `UNKNOWN_WEIGHT_MODEL` et non actionnable tant que le total n'est pas vérifié.
- Les 10 éléments `UNRESOLVED` restent dans la curation/staging et ne sont pas transformés en recommandations actives.

## Recherche versionnée

Ajout de :

- `research/MASTER_RESEARCH_STAGING_PROMPT.md` ;
- `research/raw_transcripts/` avec 13 transcriptions ;
- `research/curation/CURATION_P0_LOT2_V6_5_2.{md,json}` ;
- `research/staging/P0_LOT2_CURATED_STAGING.json` ;
- `research/staging/P0_LOT2_APPROVED_IMPORT.json`.

Le prompt maître a été aligné sur le matériel confirmé **Twin Power FE C5000XG** et sur la taxonomie Hamachi/Inada/Warasa/Buri = *Seriola quinqueradiata* lorsque l'espèce est bien identifiée.

## Front / PWA

- Titre front : V6.5.3 Enrichissement P0.
- Fiche Madai enrichie : `Bait → courant → cassure`.
- Synthèses Suzuki/Hirame/Madai/Saba mises à jour.
- Nouveau cache service worker : `carnet-peche-jp-v6-5-3-p0-enrichment-20260812`.

## Non-régression

Référence inchangée : **Ise-Shima / Hamachi / 26-11-2026 = indice 75, fenêtre 06:30–08:00, moyenne 70, aube, étale, proxy 0,145072...**.
