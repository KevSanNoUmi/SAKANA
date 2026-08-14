# V6.5.10 — Navigation contextuelle

Date : 2026-08-14

## Objet

Release UX uniquement. Aucun changement du moteur de décision, des observations, des scores, des règles Evidence, des tables de marée ou du plafond matériel.

## 1. Navigation contextuelle en fin de fiche espèce

Chaque panneau `Terrain · Leurres · Couleurs · Animations · Comprendre` se termine maintenant par :

- un accès direct au panneau précédent et suivant ;
- un retour à la destination depuis laquelle la fiche a été ouverte, lorsque ce contexte existe.

L'objectif est d'éviter les impasses de lecture et les remontées inutiles vers la barre d'onglets.

## 2. Mode Lecture

Le panneau `Comprendre` propose un `Mode Lecture` dédié aux contenus documentaires longs.

En mode Lecture :

- le loadout, la navigation locale, les relations et les contrôles secondaires sont masqués ;
- la largeur de lecture est plafonnée ;
- corps, interligne et rythme vertical sont augmentés ;
- un bouton flottant `Quitter Lecture` reste toujours accessible.

Le mode n'est pas proposé dans les panneaux opérationnels afin de ne pas ajouter de contrôle inutile.

## 3. Contexte sticky

Les fiches espèces gardent un rappel compact sous le header :

`Espèce · section active · destination éventuelle`

Les destinations gardent également un rappel sticky :

`Destination · jour sélectionné`

L'utilisateur sait donc où il se trouve même après un long scroll.

## 4. Tout ouvrir / Tout réduire

Dans un pad destination, un contrôle sticky pilote tous les blocs de divulgation progressive :

- `Tout ouvrir` si aucun bloc n'est développé ;
- `Tout réduire` dès qu'au moins un bloc est ouvert.

Cela permet de revenir instantanément à une vue scannable après consultation détaillée.

## 5. Navigation par relations

Les liens sont générés uniquement depuis les données structurées existantes (`target_species`) :

- depuis une espèce : destinations du voyage où elle est ciblée ;
- dans un contexte destination : autres espèces ciblées sur cette étape ;
- depuis une destination : autres étapes qui partagent au moins une espèce cible.

Aucune relation n'est extrapolée ou inventée.

## PWA

Nouveau cache : `carnet-peche-jp-v6-5-10-navigation-contextuelle-20260814`.
