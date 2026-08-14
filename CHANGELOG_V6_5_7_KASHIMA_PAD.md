# CHANGELOG — V6.5.7 Kashima pad

Date : 2026-08-12

## Correction voyage

- Rétablissement de **Kashima** comme pad actif le **4 décembre 2026**, pendant le séjour Tokyo.
- `trip_pad=true` pour le stop 8 (`port=kashima`).
- Cibles visibles : **Hirame / Suzuki / Hamachi**.
- Marées JMA Kashima déjà présentes réutilisées sans modification.
- `pipeline.py` inclut définitivement le stop 8 dans `TRIP_PAD_STOP_IDS`.

## Cache décisionnel

- `decision_cache.json` : **93 séries** au lieu de 90.
- Ajout des 3 séries Kashima 30 min et du résumé journalier du 4 décembre.
- Le pad Kashima bénéficie du chemin rapide V6.5.6 : aucune reconstruction lourde au tap.

## Non-changements

- observations : **501** ;
- inférences : **35** ;
- intel locales : **264** ;
- aucune modification des formules de score, Evidence, poids ou typologies ;
- référence Ise-Shima / Hamachi / 26 novembre inchangée : **75 · 06:30–08:00 · moyenne 70**.

## PWA

Nouveau cache : `carnet-peche-jp-v6-5-7-kashima-pad-20260812`.
