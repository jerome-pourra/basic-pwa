# Configuration et Fonctionnalités

## Variables d'environnement

Dans le fichier `.env`, définissez la variable suivante :

```env
VITE_MODE="DEV"  # Mode développement (sans service worker)
# ou
VITE_MODE="PROD" # Mode production (avec service worker)
```

## Comportement selon l'environnement

- **En mode DEV** :
  - Aucun service worker n'est activé.

- **En mode PROD** :
  - Un service worker est activé pour mettre en cache les données de LA VERSION ACTUELLE de l'application.
  - Voir le fichier `public/sw.js` et la variable `const CACHE_NAME = 'CURRENT_VERSION_APP';`

## Fonctionnalités principales

- Mise en cache des ressources pour permettre un fonctionnement hors ligne.

- Affichage d'un bouton d'état réseau indiquant si le client est en ligne ou hors ligne.

- Activation de la caméra (avec permissions utilisateur requises).

- Activation de la géolocalisation (avec permissions utilisateur requises).

## Commandes du projet

Pour exécuter le projet, utilisez les commandes suivantes :

```bash
# Démarrer le serveur de développement
npm run dev

# Construire l'application pour la production
npm run build

# Prévisualiser l'application construite
npm run preview
```
