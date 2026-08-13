# AMPH Lab · VU CSE — ICSETEP e-Certificate Portal

Clean static website for the ICSETEP RDG Sub-Project e-certificate portal.

## Deploy on GitHub Pages
1. Create a public GitHub repository.
2. Upload `index.html` and the `assets/` folder.
3. Repository → Settings → Pages → Deploy from branch → `main` → `/ (root)`.
4. Save and open the published Pages URL.

The page is static and does not require a build step. PDF export uses jsPDF from cdnjs, so the browser needs internet access for PDF download. PNG export works locally in the browser.
