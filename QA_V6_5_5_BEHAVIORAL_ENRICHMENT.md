# QA — V6.5.5 Enrichissement comportemental

Date : 2026-08-12

## Validation statique

- `python -m py_compile pipeline.py` : **OK**.
- JavaScript extrait de `index.html` : `node --check` **OK**.
- `sw.js` : `node --check` **OK**.
- JSON valides : `data.json`, `tides_2026.json`, `synthesis.json`, `lure_typology.json`, `manifest.webmanifest`, curation batch 3, staging import batch 3 et manifeste batch 3.

## SQLite / intégrité

- `PRAGMA integrity_check` : **ok**.
- `PRAGMA foreign_key_check` : **0 erreur**.
- doublons `canonical_hash` : **0**.
- observations : **501**.
- inférences : **35**, hors preuves.
- intelligence locale : **264**.
- espèces documentées : **11**.
- Hirasuzuki explicitement rangé sous Suzuki : **0**.
- pression atmosphérique dans `index.html` / scoring : **0**.
- recommandation active avec `cast_weight_g > 50` : **0**.
- modèles précis au poids inconnu restent filtrés par le moteur matériel.

## Distribution factuelle

- Suzuki : **129**
- Hirame : **125**
- Hamachi : **88**
- Aori-Ika : **79**
- Kurodai : **34**
- Hirasuzuki : **17**
- Tachiuo : **16**
- Madai : **9**
- Saba : **2**
- Aji : **1**
- Mebaru : **1**

## Batch 3

- **21 transcriptions brutes** archivées : 12 dans `batch3_partA_14_25`, 9 dans `batch3_partB_1_9`.
- **30 observations** importées depuis la curation détaillée.
- **18 inférences** importées séparément.
- outcomes des 30 observations : **21 observation / 5 catch / 3 lost / 1 bite**.
- captures positives certaines : **Suzuki ×2 + Hirame ×3**.
- aucun nouvel événement positif Hamachi.
- les 5 nouvelles observations Hamachi ont `exclude_presence_evidence=true` et aucun tag `moment_jour` / `maree`.
- la source expert Hirame timing/courant est importée uniquement dans `inferences` : aucune « capture virtuelle » horaire n’est créée.
- les vidéos d’un même créateur/groupe partagent `source_identity.corporate_group` pour éviter une réplication documentaire artificielle.

## Récurrence positive

`observationPolarity()` traite désormais explicitement les outcomes curatés :

- `catch` / `capture` / `positive` → positif ;
- `lost`, `bite`, `miss`, `follow`, `refusal`, etc. → non positif.

Les touches et poissons décrochés restent donc visibles comme faits terrain sans renforcer les pourcentages de récurrence.

## Pipeline / matériel

- `_research_tags()` préserve directement les tags de staging utiles : `spot_type`, `comportement`, `profondeur`, `temperature_eau`, `couleur_eau`, `observation` et saison explicite.
- la vibration 14 g de la séquence Suzuki est exportée avec `cast_weight_g=14`.
- les familles génériques Hamachi/Hirame/Suzuki restent `UNVERIFIED_GENERIC` plutôt que d’être artificiellement transformées en modèle exact de 50 g.
- les mentions source >50 g restent documentaires seulement ; aucune recommandation active >50 g.

## Dates / marées / pads

- 6 pads affichés pour 5 destinations de voyage.
- toutes les `stay_dates` des pads disposent d’une journée de marée embarquée : **100 % de couverture**.
- Shizuoka et Kashima restent hors pads de voyage.

## Non-régression fenêtre de référence

Référence V6.5.4 : **Ise-Shima / Hamachi / 26 novembre 2026 → 75 · 06:30–08:00**.

La V6.5.5 n’ajoute aucun input Hamachi susceptible de modifier cette série :

- distribution brute `moment_jour` Hamachi V6.5.4 = V6.5.5 : `aube 15 / jour 8 / crépuscule 3 / nuit 1` ;
- distribution brute `maree` Hamachi V6.5.4 = V6.5.5 : `descendante 4 / étale 1` ;
- ensemble des observations Hamachi éligibles aux entrées `moment/tide/presence` du moteur : **identique, 76 → 76** ;
- les 5 nouvelles observations Hamachi sont techniques, sans timing et exclues de la preuve de présence ;
- aucune fonction de calcul `speciesWindowSeries`, `speciesWindowPoint`, `contiguousWindows`, `momentAffinityAt`, `tideAffinityForSpecies` ou `movementAffinityForSpecies` n’a été modifiée.

La référence fonctionnelle reste donc **75 · 06:30–08:00**.

## Front / PWA

- géométrie mobile V6.5.4 conservée : bandes espèces épaissies et courbe marée inchangée.
- nouveau cache : `carnet-peche-jp-v6-5-5-behavioral-enrichment-20260812`.
- la prochaine passe performance discutée précédemment n’est **pas** incluse dans cette release : V6.5.5 reste une release d’enrichissement/curation.

## Vérification manuelle recommandée après GitHub Pages

Sur iPhone : ouvrir Ise-Shima/Hamachi le 26-11, Tokyo/Suzuki, une fiche Hirame, puis vérifier un plan de fenêtre et un retour accueil. Le premier chargement réseau après déploiement doit installer le nouveau service worker ; les ouvertures suivantes doivent utiliser le cache V6.5.5.
