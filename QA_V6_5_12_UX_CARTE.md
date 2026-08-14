# QA V6.5.12 — UX carte

## Contrôles automatiques

- [x] `pipeline.py` compile.
- [x] JavaScript inline de `index.html` valide syntaxiquement.
- [x] `sw.js` valide syntaxiquement.
- [x] JSON de runtime valides.
- [x] SQLite `integrity_check = ok`.
- [x] SQLite `foreign_key_check` sans erreur.
- [x] Données métier inchangées par rapport à V6.5.11.
- [x] La carte génère 8 boutons d'étape.
- [x] Les coordonnées projetées restent dans le viewport de la carte.
- [x] Fukuoka / Itoshima reçoivent un décalage tactile distinct.
- [x] Les liens de liste sous la carte restent disponibles comme solution de repli.
- [x] Quick Peek >= 40 px ; fermeture sheet = 44 px ; pins carte = 44 px ; FAB >= 52 px.
- [x] Les caches supprimés sont limités au préfixe `carnet-peche-jp-`.
- [x] Une erreur `localStorage` empêche le reset du formulaire de session.

## À vérifier sur téléphone réel après déploiement

- [ ] Toucher successivement les étapes 2 et 3 (Fukuoka / Itoshima) sans erreur de cible.
- [ ] Vérifier la lisibilité de la carte en mode standalone PWA.
- [ ] Vérifier le rail espèce avec le pouce droit et gauche.
- [ ] Vérifier le retour du focus après fermeture d'un Quick Peek avec clavier externe / accessibilité.
