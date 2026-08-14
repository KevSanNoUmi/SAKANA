# V6.5.2 — Correctifs intégrité

Date : 2026-08-12

Cette release conserve le moteur de fenêtres et les optimisations V6.5.1. Elle corrige uniquement des incohérences d’intégrité détectées lors de la reprise du projet.

## Corrigé

- priorité de la typologie centrale sur les anciens `typology_json` embarqués ;
- neutralisation des modèles nommés dont le poids reste inconnu ;
- I-SLIDE 187R SW correctement exclu comme >50 g ;
- Tachiuo #217 corrigé en recommandation générique de tenya ;
- 16 typologies historiques manifestement non plausibles nettoyées dans SQLite ;
- Maria #66, #67, #68, #75 reclassés Suzuki → Hirasuzuki ;
- Shizuoka et Kashima masqués des pads de voyage tout en restant disponibles comme contexte documentaire ;
- `PROJECT_STATE.md` remis à jour avec le moulinet confirmé Twin Power FE C5000XG ;
- cache PWA incrémenté.

## État après correction

- 440 observations ;
- Suzuki 97 ;
- Hirasuzuki 17 ;
- 0 doublon canonique ;
- 0 recommandation active explicitement >50 g ;
- référence Ise-Shima / Hamachi / 26-11 inchangée : 75, 06:30–08:00.
