# QA — V6.5.7 Kashima pad

Date : 2026-08-12

## Objet

Correction de navigation uniquement : **Kashima redevient un pad actif le 4 décembre 2026**, pendant le séjour Tokyo. Aucun enrichissement biologique ou changement de formule n'est inclus dans cette release.

## Validation structurelle

- `python -m py_compile pipeline.py` : **OK**
- syntaxe JavaScript `index.html` via `node --check` : **OK**
- syntaxe `sw.js` : **OK**
- syntaxe `build_runtime_cache.js` : **OK**
- JSON : `data.json`, `app_core.json`, `decision_cache.json`, `synthesis.json`, `lure_typology.json`, `tides_2026.json`, `manifest.webmanifest`, `RELEASE_MANIFEST_V6_5_7.json` : **OK**
- SQLite `PRAGMA integrity_check` : **ok**
- SQLite `PRAGMA foreign_key_check` : **0 erreur**
- `python pipeline.py export` : **OK**, et conserve Kashima comme pad actif

## Intégrité des données

- observations : **501**
- espèces : **11**
- inférences : **35**
- intel locales : **264**
- doublons `claim_id` : **0**
- Hirasuzuki importé sous Suzuki : **0**
- pression atmosphérique/barométrique dans les observations : **0**
- recommandation active >50 g : **0**
- hash sémantique des observations identique V6.5.6 → V6.5.7 : `47e5d07846f0bdeb87a4ec9c77171771d5cb481cc2500c8e837877895abef0ed`

## Kashima

- stop : `id=8`
- `trip_pad` : **true**
- port : `kashima`
- date : **2026-12-04 uniquement**
- espèces cibles : **Hirame / Suzuki / Hamachi**
- couverture marée JMA : **OK**
- séries décisionnelles pré-calculées : **3/3**
- résumé journalier pré-calculé : **1/1**
- séries décisionnelles totales : **93**
- pads visibles totaux : **7**
- références pad × jour couvertes par JMA : **23/23**

La station Kashima déjà présente dans `tides_2026.json` est utilisée : PM 00:42, BM 05:33, PM 11:55, BM 19:19.

## Non-régression décisionnelle

Référence obligatoire Ise-Shima / Hamachi / 2026-11-26 :

- score max : **75**
- fenêtre : **06:30–08:00**
- moyenne : **70**
- pic : **75**
- proxy mouvement : **0.14507225633834517**

Aucune observation, inférence, typologie ou formule de score n'a changé entre V6.5.6 et V6.5.7.

## Performance / PWA

L'architecture V6.5.6 est conservée. Kashima est ajouté au cache build :

- `app_core.json` : **40 589 octets**
- `decision_cache.json` : **115 574 octets**
- `tides_2026.json` : **16 232 octets**
- total JSON bloquant : **172 395 octets**

Nouveau cache service worker : `carnet-peche-jp-v6-5-7-kashima-pad-20260812`.

## Contrôle téléphone recommandé

Après déploiement GitHub Pages : recharger une fois, fermer/réouvrir la PWA, puis vérifier que le pad **Kashima · 4 déc** apparaît avec Hirame / Suzuki / Hamachi, sa courbe de marée et ses fenêtres, et qu'il s'ouvre sans message de calcul des fenêtres.
