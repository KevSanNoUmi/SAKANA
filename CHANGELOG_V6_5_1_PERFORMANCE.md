# V6.5.1 — Performance mobile

## Pourquoi

L'ouverture d'un pad destination était devenue lente après l'ajout des fenêtres idéales et du moteur Evidence. Le problème venait surtout de recalculs imbriqués : chaque tranche de 30 minutes pouvait rescanner les 440 observations, recalculer les sources, le soleil et les brackets de marée, puis `renderHome()` reconstruisait toute la page.

## Corrections

- `toggleStop()` n'appelle plus `renderHome()` : seul le pad demandé est inséré/retiré.
- `setTideDay()` ne reconstruit plus l'accueil : seul le détail de la destination est remplacé.
- ouverture/fermeture d'un plan de créneau : rendu local du pad uniquement.
- feedback immédiat avec squelette léger avant le premier calcul non mis en cache.
- index `species_id -> observations` construit une fois.
- cache mémoire pour :
  - récurrences `moment_jour` ;
  - préférences marée ;
  - événements JMA et brackets PM/BM ;
  - heures solaires et plages aube/jour/crépuscule/nuit ;
  - Evidence (`evidenceGroup`, `strongestEvidence`) ;
  - facteur local de fenêtre ;
  - séries 24 h par espèce ;
  - meilleures fenêtres et résumés journaliers ;
  - SVG de courbe de marée ;
  - poids/statut matériel des recommandations.
- les jours non affichés d'un séjour ne sont plus tous calculés pendant le premier tap : ils sont complétés progressivement en tâche de fond.
- préchauffage léger de la première journée de chaque destination pendant une période idle.
- nouveau cache PWA `v6-5-1-performance-20260812`.

## Non-régression

Les formules de score n'ont pas été modifiées. Cas de contrôle : Ise-Shima / Hamachi / 26 novembre 2026 conserve `max 75`, fenêtre `06:30–08:00`, pic `aube`, phase `étale` et le même indice de variation de niveau.
