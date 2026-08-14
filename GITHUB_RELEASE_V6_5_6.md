# GitHub — V6.5.6 Performance architecture

Dézipper l'archive à la racine du dépôt en remplaçant les fichiers existants, puis :

```bash
git add -A
git commit -m "Carnet Peche JP V6.5.6 performance architecture"
git push
```

Aucune étape de build n'est nécessaire pour GitHub Pages : `app_core.json` et `decision_cache.json` sont déjà générés et versionnés.

Pour une future modification de données :

```bash
python pipeline.py export
```

Cette commande régénère les deux caches runtime via Node.js (`build_runtime_cache.js`).

Cache PWA : `carnet-peche-jp-v6-5-6-performance-architecture-20260812`.
