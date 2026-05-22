# Filar

Strona firmowa przepisana z WordPressa na statyczny HTML + CSS + Vanilla JS.

## Stack
- HTML5 (semantyczny, wielostronicowy)
- CSS3 (custom properties, Flexbox, Grid, responsywny)
- Vanilla JavaScript (bez frameworków)
- EmailJS (formularz kontaktowy)
- GitHub Actions → FTP deploy na home.pl

## Struktura
```
/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── team.html
├── contact.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── components.css
│   ├── js/
│   │   ├── components.js   # shared header/footer
│   │   └── main.js         # interactions
│   ├── images/
│   └── fonts/
└── .github/
    └── workflows/
        └── deploy.yml
```

## Deployment
Push na `main` → GitHub Actions → FTP → home.pl
