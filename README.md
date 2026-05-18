# Aditya Koundinya — Portfolio

Personal portfolio site for [Aditya Koundinya](https://github.com/Aditya-Koundinya), Senior Cloud & DevOps Engineer.

**Live site:** `https://aditya-koundinya.github.io` (after deployment)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a repository named **`Aditya-Koundinya.github.io`** on GitHub.
2. Push this project to the `main` branch.
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Push to `main` — the workflow deploys automatically.

## Project structure

- `index.html` — single-page layout
- `src/styles.css` — design system, light/dark themes
- `src/main.js` — nav, theme toggle, scroll reveals
- `public/assets/` — static files served on the site:
  - `profile.png` — hero photo
  - `resume.pdf` — downloadable resume
  - `consultant-profile.pdf` — consultant profile (reference copy, not linked on site)
