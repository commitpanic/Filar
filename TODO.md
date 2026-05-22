# TODO: Filar — Migracja WordPress → Static HTML/CSS/JS

## Faza 1 — Setup & Inicjalizacja
- [x] Założenie prywatnego repo "Filar" na GitHub
- [x] `git init` w `d:\Filar`
- [x] `.gitignore`, `README.md`
- [x] Struktura folderów: `assets/css/`, `assets/js/`, `assets/images/`, `assets/fonts/`

## Faza 2 — Baza HTML/CSS
- [x] Wspólny header/footer ładowane przez JS (`components.js`)
- [x] CSS: custom properties, reset, typografia, grid, breakpointy
- [x] Nawigacja desktop + hamburger mobile
- [x] Footer z linkami i danymi

## Faza 3 — Podstrony i treść
- [x] `index.html` — Hero · O nas · Usługi · Portfolio · Zespół · FAQ · Testimoniale · Cennik · CTA
- [x] `about.html` — Historia, misja, wartości
- [x] `services.html` — Pełne opisy usług
- [x] `portfolio.html` — Siatka projektów
- [x] `team.html` — Karty zespołu
- [x] `contact.html` — Formularz EmailJS + mapa
- [ ] `gallery.html` — Galeria *(opcjonalnie)*

## Faza 4 — JavaScript & Interaktywność
- [x] Hamburger menu
- [x] Smooth scroll
- [x] Animacje Intersection Observer
- [x] FAQ accordion
- [x] Testimonials slider
- [x] Liczniki statystyk
- [x] EmailJS — integracja i walidacja formularza
- [ ] Lightbox galerii *(opcjonalnie)*

## Faza 5 — SEO & Performance
- [ ] Meta tagi per podstrona (title, description, Open Graph)
- [ ] Favicon + apple-touch-icon
- [ ] `robots.txt`, `sitemap.xml`
- [ ] Obrazy: WebP + `loading="lazy"`
- [ ] Lighthouse audit (cel ≥ 90)
- [ ] Google Analytics *(opcjonalnie)*

## Faza 6 — Deployment na home.pl
- [x] `.github/workflows/deploy.yml` — GitHub Actions → FTP
- [ ] GitHub Secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
- [ ] Dane FTP z panelu home.pl
- [ ] Test na subdomenie / folderze staging
- [ ] Przekierowanie domeny ze starego WP

## Ciągłe
- [ ] Commity wg konwencji: `feat/fix/chore`
- [ ] Code review przed każdym deployem na produkcję
