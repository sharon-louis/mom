# ✦ Maman, notre étoile

Un site web émotionnel et interactif dédié à notre Maman pour la Fête des Mères 2026.

Réalisé avec amour par **Stéphane, Sean, Stacy, Jessica, Tonya** et **Chloé** 💚

---

## 🌿 Le concept

Un mini-film interactif en huit chapitres : portrait, citation, timeline de souvenirs, mur de messages personnels, galerie polaroid, constellation familiale, livre souvenir feuilletable, et finale émotionnelle avec pluie de pétales.

Esthétique : **vert sauge + crème + accents dorés**, typographie éditoriale (Cormorant Garamond + Manrope + Caveat), animations fluides au scroll.

---

## 📁 Structure du projet

```
maman-notre-etoile/
├── index.html              ← La page (8 chapitres)
├── src/
│   ├── style.css           ← Design system + animations
│   └── script.js           ← Interactions (lightbox, cartes, livre, pétales…)
├── public/
│   └── media/
│       ├── photos/         ← 15 photos renommées narrativement
│       └── videos/         ← 2 vidéos
├── README.md
└── .gitignore
```

---

## 🚀 Lancer en local

Aucune installation requise. Trois options :

**Option 1 — Le plus simple :**
Double-cliquez sur `index.html`. Note : certains navigateurs bloquent les vidéos en `file://`. Si c'est le cas, utilisez l'option 2.

**Option 2 — Serveur local Python :**
```bash
cd maman-notre-etoile
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
```

**Option 3 — Avec Node :**
```bash
npx serve .
```

---

## 🌐 Publier sur GitHub Pages (gratuit)

1. **Créer un dépôt** sur [github.com](https://github.com) (ex. `maman-notre-etoile`).
2. **Initialiser et pousser** :
   ```bash
   cd maman-notre-etoile
   git init
   git add .
   git commit -m "✦ Pour Maman"
   git branch -M main
   git remote add origin https://github.com/VOTRE-USER/maman-notre-etoile.git
   git push -u origin main
   ```
3. **Activer Pages** : sur GitHub → **Settings** → **Pages** → Source : `Deploy from a branch` → Branch : `main` / `/root` → **Save**.
4. Attendez 1 à 2 minutes. Votre site sera disponible à :
   `https://VOTRE-USER.github.io/maman-notre-etoile/`

### Autres hébergeurs (encore plus simples)

- **Netlify Drop** ([app.netlify.com/drop](https://app.netlify.com/drop)) : glissez-déposez le dossier, c'est en ligne en 10 secondes.
- **Vercel** : connectez le dépôt GitHub, déploiement automatique.
- **Cloudflare Pages** : également via GitHub, gratuit.

---

## 🎨 Personnaliser

### Modifier les messages des enfants
Ouvrir `index.html`, chercher `<section class="messages"`. Chaque enfant a sa propre `<article class="card">` — modifiez le texte dans `.card__msg`.

### Changer la musique
Dans `index.html`, balise `<audio id="bgAudio">` : remplacez l'URL `<source>` par votre fichier MP3. Pour héberger localement, placez le MP3 dans `public/media/` et utilisez `src="public/media/votre-musique.mp3"`.

### Ajouter / remplacer des photos
Placez vos images dans `public/media/photos/` puis mettez à jour les `<img src="...">` dans `index.html`.

### Modifier les couleurs
Tout est centralisé en haut de `src/style.css`, sous `:root`. Variables principales :
- `--sage-500` : vert principal
- `--cream` : fond
- `--gold` : accents

---

## ⚙️ Stack technique

- **HTML / CSS / JavaScript** vanilla — pas de build, pas de framework
- **GSAP + ScrollTrigger** (via CDN) pour les animations au scroll
- **Google Fonts** : Cormorant Garamond, Manrope, Caveat
- **Aucune dépendance npm** — tout est statique

---

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge récents
- ✅ Mobile (iOS Safari, Android Chrome) — design responsive
- ✅ Respecte `prefers-reduced-motion`

---

## 💡 Améliorations possibles

- Ajouter des effets sonores discrets sur les interactions (flip des cartes, ouverture lightbox)
- Mode plein écran sur la galerie avec navigation au clavier
- Chapitre vocal : enregistrement d'un message audio de chaque enfant
- Mode sombre / mode jour
- Version PWA installable sur téléphone
- Partage social avec image OG personnalisée

---

## ❤️ Crédits

- Concept, design & code : un cadeau de famille
- Musique : *Heartwarming* — Kevin MacLeod (Incompetech), licence CC-BY 3.0 — remplaçable
- Photos & vidéos : nos archives familiales

---

Bonne fête, Maman. ✦
