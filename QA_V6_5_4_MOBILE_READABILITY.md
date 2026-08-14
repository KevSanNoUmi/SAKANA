# QA — V6.5.4 Lisibilité mobile

Date : 2026-08-12

## Validation statique

- `python -m py_compile pipeline.py` : OK.
- JavaScript extrait de `index.html` : `node --check` OK.
- `sw.js` : `node --check` OK.
- JSON : `data.json`, `tides_2026.json`, `synthesis.json`, `lure_typology.json`, `manifest.webmanifest` valides.
- SQLite : `integrity_check=ok`; `foreign_key_check` sans erreur.
- 471 observations, 11 espèces, 264 éléments d’intelligence locale, 17 inférences.
- 0 doublon `claim_id`.
- 0 texte `ヒラスズキ` classé sous Suzuki dans l’export.
- 0 recommandation active explicitement >50 g détectée.
- couverture marée des pads voyage : complète.

## Contrôle graphique

Avant V6.5.4 : bande espèce = 4 unités SVG, pas vertical = 6, composant = 88 px.

V6.5.4 : bande espèce = 10 unités SVG, pas vertical = 12, composant = 116 px sur téléphone ≤430 px. Pour six espèces, l’épaisseur réellement affichée passe d’environ 2,75 px à environ 7,1 px, soit **≈ ×2,6**.

La courbe de marée dispose de son propre espace vertical sous les bandes et n’est pas recouverte. Les zones tactiles suivent la nouvelle épaisseur.

## Non-régression moteur

Le diff V6.5.3 → V6.5.4 ne modifie aucune fonction de calcul de score/fenêtre (`speciesWindowSeries`, Evidence, agrégats moment/marée, `contiguousWindows`). Seules la géométrie du SVG, la hauteur CSS, le titre et le cache PWA changent côté front. La référence V6.5.3 reste donc la référence fonctionnelle : **Ise-Shima / Hamachi / 26-11-2026 → 75 · 06:30–08:00**.

## Test manuel recommandé

Sur iPhone : ouvrir Ise-Shima, Kobe et Tokyo ; vérifier 5–6 espèces simultanées, lisibilité des lignes, courbe non écrasée, PM/BM visibles, et tap sur une ligne espèce ouvrant toujours le plan.
