# V6.5.12 — UX carte

## Modifications

- Remplacement de la pseudo-carte quadrillée par une vue géographique autonome hors-ligne.
- Silhouette du Japon embarquée directement dans `index.html` ; aucun fond cartographique réseau n'est requis.
- Trajet projeté à partir des coordonnées des ports JMA déjà utilisées par l'application.
- 8 étapes numérotées et cliquables ; Fukuoka / Itoshima sont séparés visuellement pour éviter le chevauchement tactile.
- Boutons principaux agrandis pour l'usage téléphone : carte/chronologie, Quick Peek, sheets, densité, onglets, marées, QCM, journal terrain, accès rapide et rail d'espèce.
- Restauration du focus après fermeture d'une bottom-sheet.
- En cas d'échec `localStorage`, le formulaire de session n'est plus effacé et un message explicite est affiché.
- Le service worker et `resetApp()` ne suppriment plus les caches d'autres applications partageant la même origine.
- Nettoyage des fichiers de release, audits et métadonnées macOS des anciennes itérations.
- Conservation des sources fabricants comme aides de confiance pondérées ; aucun changement de données ni de moteur Evidence.

## Inchangé

- 501 observations.
- 35 inférences.
- Données marées JMA.
- Scores et fenêtres de pêche.
- Plafond matériel 50 g.
- Séparation Suzuki / Hirasuzuki.
