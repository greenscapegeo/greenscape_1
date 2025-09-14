Greenscape React App

Overview
- React (Vite + TS) single-page app with all content and visuals configured via .env.
- Floating leaf particles follow the mouse; mobile-friendly responsive layout.
- Sections are modular and ordered via env for microservice-like interchangeability.
- Dockerfile provided for deployment on a GCP VM (Nginx static hosting).

Quick Start
- Copy `.env.example` to `.env` and adjust values.
- Install and run:
  - `npm install`
  - `npm run dev` then open http://localhost:5173

Build
- `npm run build` outputs `dist/`.
- `npm run preview` to locally preview production build.

Sections (controlled by env `VITE_ENABLED_SECTIONS`)
- Header, Hero, About, Why, Services.Showroom, Services.Design, Services.Planting, Contact, Footer.

Env-Driven Config
- All text, images, colors, arrays are read from `import.meta.env` (VITE_*) without defaults.
- Lists are JSON strings (e.g., `VITE_WHY_ITEMS`, `VITE_SHOWROOM_BULLETS`, `VITE_PLANTING_CHECKLIST`).
- Leaf animation: `VITE_LEAF_SVG` (path or svg), `VITE_LEAF_COUNT`, `VITE_LEAF_COLOR`, `VITE_LEAF_FOLLOW_STRENGTH`.

GCP VM Deployment (Nginx)
1) Build Docker image
   - Ensure `.env` is present (values are embedded at build time).
   - `docker build -t greenscape:latest .`
2) Run locally to test
   - `docker run --rm -p 8080:80 greenscape:latest`
   - Open http://localhost:8080
3) Push to registry (optional: Artifact Registry)
   - `docker tag greenscape:latest REGION-docker.pkg.dev/PROJECT/REPO/greenscape:latest`
   - `docker push REGION-docker.pkg.dev/PROJECT/REPO/greenscape:latest`
4) On GCP VM (Debian/Ubuntu)
   - Install Docker (`sudo apt-get update && sudo apt-get install -y docker.io`)
   - Pull image (`docker pull …/greenscape:latest`) or `scp` your image tar.
   - Run: `sudo docker run -d --restart=always -p 80:80 --name greenscape …/greenscape:latest`

Notes
- Never place secrets in `.env` for the frontend; env values are bundled and public.
- To change content or layout, edit `.env` and rebuild.
- To reorder or disable sections, edit `VITE_ENABLED_SECTIONS`.

Using Georgian Fonts
- Place your font files in `public/fonts/` (e.g., `public/fonts/bpg-nino.woff2`). Files in `public/` are served from `/`.
- Option A (env-driven): set in `.env` and restart dev server
  - `VITE_FONT_GEORGIAN_FAMILY="YourGeorgianFontName"`
  - `VITE_FONT_GEORGIAN_URL_WOFF2=/fonts/bpg-nino.woff2`
  - `VITE_FONT_GEORGIAN_WEIGHT=400`
  - `VITE_FONT_GEORGIAN_STYLE=normal`
- Option B (CSS): add `@font-face` in `src/styles.css` and set `unicode-range` for Georgian.
