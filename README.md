# AMPH Lab — Inception Workshop e-Certificate site

Plain static site (HTML/CSS/JS, no build step, no framework, no Lovable
dependency). Everything needed to run it is in this folder.

## Deploy

Upload the contents of this folder to any static host:

- **Netlify / Vercel**: drag-and-drop this folder (or its zip) in the
  dashboard, or `netlify deploy` / `vercel` from inside the folder.
- **GitHub Pages**: push this folder to a repo and enable Pages on the
  `main` branch / root.
- **Any shared host (cPanel, etc.)**: upload the contents of this folder
  to `public_html` (or your web root) via FTP/File Manager.

No `npm install`, no build — `index.html` is the entry point.

## Structure

```
index.html              Full one-page site
assets/css/style.css     All styling (mobile-first, single font system)
assets/js/certificate.js Certificate SVG template + canvas renderer
assets/js/main.js        UI wiring (nav, form, downloads, toast)
assets/logos/*.png       VU / CSE / ICSETEP / UGC / ADB logos
favicon.ico, robots.txt
```

## Notes

- The certificate (used for the "Get e-Certificate" download) is built
  entirely in code — background artwork, logos and layout are generated
  as an SVG, then the participant's name is stamped on top with a
  canvas so downloads are crisp at full resolution. There is no external
  image dependency, so nothing can go missing after deploy.
- To change the certificate wording, signatures or layout, edit
  `buildCertificateSVG()` in `assets/js/certificate.js`.
- To change team members / guests, edit the "Guests & project team"
  section directly in `index.html`.
- PDF export uses jsPDF loaded from a CDN
  (`cdnjs.cloudflare.com/ajax/libs/jspdf`). If you need a fully offline
  build, download that file into `assets/js/` and update the `<script>`
  tag in `index.html`.
