# 🖼️ Image Effect Generator

Une application web interactive pour générer des effets d'élévation sur des images et télécharger le rendu final.

## 📝 Description

**Image Effect Generator** est un outil visuel développé avec **Next.js** et **Tailwind CSS**. Il permet d'ajouter dynamiquement des effets d’élévation (padding, bordures arrondies, ombres) sur des images téléchargées, puis de les exporter au format PNG.

L'application est découpée en trois modules : chargement de l'image, personnalisation des effets, et export final.

## 🚀 Fonctionnalités

- Upload d’image avec aperçu instantané
- Réglages dynamiques :
  - Padding (`range`)
  - Border Radius (`range`)
  - Shadow Depth (`range`)
- Génération de l’image en base64
- Affichage avec rendu visuel personnalisé
- Export PNG via [Resvg](https://github.com/RazrFalcon/resvg) et [Satori](https://github.com/vercel/satori)

## 🧠 Techniques utilisées

- Gestion des états avec [`useState`](https://react.dev/reference/react/useState)
- Rendu dynamique basé sur les valeurs de padding, radius, et shadow
- Utilisation de l'[API FileReader](https://developer.mozilla.org/fr/docs/Web/API/FileReader) pour convertir une image en base64

## 🛠️ Technologies & librairies

- React.js
- Next.js
- Tailwind CSS
- DaisyUI – Composants UI Tailwind
- Satori – Génération de SVG depuis des composants React
- @resvg/resvg-wasmresvg-wasm) – Rendu SVG → PNG

---

Développé pour apprendre la structuration d’une application React moderne avec Next.js, la composition de composants réutilisables et la gestion des useState
