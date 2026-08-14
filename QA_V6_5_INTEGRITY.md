# QA — V6.5.2 Intégrité

Date : 2026-08-12

## Verdict

La passe V6.5.2 corrige les incohérences d’intégrité détectées après le handoff V6.5.1 sans modifier les formules de fenêtres ni le refactor de performance mobile.

## Validation statique

- `python -m py_compile pipeline.py` : OK.
- JavaScript extrait de `index.html` : `node --check` OK.
- `sw.js` : `node --check` OK.
- JSON valides : `data.json`, `tides_2026.json`, `synthesis.json`, `lure_typology.json`, `manifest.webmanifest`.
- SQLite : `PRAGMA integrity_check = ok`.
- SQLite : `PRAGMA foreign_key_check` sans erreur.
- doublons `canonical_hash` : 0.

## État des données

- 440 observations validées.
- 11 espèces.
- 264 éléments d’intelligence locale.
- 8 inférences séparées du corpus de preuves.
- pression atmosphérique décisionnelle : 0 dimension active.

Distribution après correction taxonomique :

- Hirame : 110
- Suzuki : 97
- Hamachi : 83
- Aori-Ika : 79
- Kurodai : 34
- Tachiuo : 16
- Hirasuzuki : 17
- Madai : 1
- Saba : 1
- Aji : 1
- Mebaru : 1

## Suzuki / Hirasuzuki

Les observations Maria #66, #67, #68 et #75 appartiennent au bloc documentaire Hirasuzuki / Flapen Wing / sarashi et ont été reclassées de Suzuki vers Hirasuzuki.

Contrôles :

- les observations #65 à #79 du bloc Maria sont désormais toutes Hirasuzuki ;
- aucune observation classée Suzuki ne contient explicitement `Hirasuzuki` ou `ヒラスズキ` ;
- les données iso-maru explicitement attribuées au Suzuki restent sous Suzuki.

## Matériel / typologie

La hiérarchie d’export est désormais :

1. typologie centrale `lure_typology.json` si le modèle est reconnu ;
2. typologie historique embarquée seulement en fallback ;
3. une famille générique peut rester active avec la contrainte ≤50 g ;
4. un modèle nommé au poids inconnu est neutralisé jusqu’à vérification.

Contrôles sur l’export :

- recommandations actives avec poids explicite >50 g : 0 ;
- I-SLIDE 187R SW : recommandation active = 0, statut `VERIFIED_OVER_LIMIT` ;
- 40 recommandations de modèles nommés/ambigus au poids ou à l’identité non suffisamment vérifiés sont neutralisées ;
- 9 recommandations sont neutralisées comme `VERIFIED_OVER_LIMIT` ;
- Tachiuo #217 : `tenya — prévoir tailles/poids S, M et L`, statut générique, aucune typologie Mini Kobako parasite.
- 16 `typology_json` historiques manifestement non plausibles ont été nettoyés dans SQLite afin d’éviter qu’un ancien rapprochement modèle/famille ne reparte dans un futur export.

Le loadout confirmé reste :

- M : Twin Power XD 4000HG ;
- MH : Twin Power FE C5000XG.

## Pads destination / dates

Shizuoka et Kashima restent disponibles comme contexte documentaire dans la base, mais portent `trip_pad=false` et ne sont plus rendus dans l’accueil du voyage.

Les pads visibles utilisent uniquement les dates du voyage :

- Fukuoka / Hakata : 15–18 novembre 2026 ;
- Shikanoshima / Itoshima, secteur Fukuoka : 15–18 novembre 2026 ;
- Kobe / Akashi : 21–24 novembre 2026 ;
- Ise-Shima : 26–28 novembre 2026 ;
- Numazu / Izu : 29 novembre–1 décembre 2026 ;
- Tokyo : 2–5 décembre 2026.

Toutes ces journées possèdent une table de marée embarquée pour le port/proxy utilisé par le pad.

## Non-régression fenêtres / performance

Harness Node VM sur les fichiers V6.5.2 :

- Ise-Shima / Hamachi / 26-11-2026 ;
- indice maximum : 75 ;
- meilleure fenêtre : 06:30–08:00 ;
- moyenne fenêtre : 70 ;
- moment dominant : aube ;
- phase : étale ;
- proxy de variation de niveau : 0.14507225633834517.

La référence V6.5.1 est donc conservée.

`toggleStop()`, changement de jour et ouverture/fermeture d’un plan continuent d’utiliser le rendu local du pad ; aucun retour à un `renderHome()` complet n’a été introduit dans ces chemins.

## PWA

Le front ayant changé, le cache du service worker est incrémenté à :

`carnet-peche-jp-v6-5-2-integrity-20260812`

## Vérification manuelle recommandée

Sur iPhone / PWA installée : ouvrir/fermer Ise-Shima plusieurs fois, naviguer 26 → 27 → 28 novembre, ouvrir puis fermer le plan Hamachi, puis vérifier Fukuoka et Kobe après mise à jour du service worker.
