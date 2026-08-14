# GitHub — V6.5.7 Kashima pad

Dézipper l’archive à la racine du dépôt en remplaçant les fichiers existants, puis :

```bash
git add -A
git commit -m "Carnet Peche JP V6.5.7 restore Kashima pad"
git push
```

Aucune étape de build n’est nécessaire pour GitHub Pages : `app_core.json` et `decision_cache.json` sont déjà générés et versionnés.

Pour une future modification de données :

```bash
python pipeline.py export
```

Le stop Kashima `id=8` fait maintenant partie de `TRIP_PAD_STOP_IDS`, donc un futur export doit conserver le pad.

Cache PWA : `carnet-peche-jp-v6-5-7-kashima-pad-20260812`.
