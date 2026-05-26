/**
 * components.js — injects shared header & footer into every page
 * Usage: add <script src="assets/js/components.js"></script> at end of <body>
 * The script reads data-page="pagename" on <body> to mark the active nav link.
 */

(function () {
  /* ── Header HTML ─────────────────────────────────────── */
  const headerHTML = `
  <nav id="navbar">
    <div class="container">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">Filar</a>
        <ul class="nav-links" id="navLinks" role="list">
          <li><a href="index.html"        data-page="home">Strona główna</a></li>
          <li><a href="about.html"        data-page="about">O nas</a></li>
          <li><a href="services.html"     data-page="services">Usługi</a></li>
          <li><a href="kalkulatory.html"  data-page="kalkulatory">Kalkulatory</a></li>
          <li><a href="contact.html"      data-page="contact" class="nav-cta">Kontakt</a></li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>`;

  /* ── Footer HTML ─────────────────────────────────────── */
  const footerHTML = `
  <footer id="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo">Filar</div>
          <p>Eksperci kredytowi i doradcy finansowi z regionu Lubuskiego. Pomagamy osobom prywatnym i firmom w wyborze najlepszych kredytów i ubezpieczeń.</p>
        </div>
        <div class="footer-col">
          <h4>Strony</h4>
          <ul>
            <li><a href="index.html">Strona główna</a></li>
            <li><a href="about.html">O nas</a></li>
            <li><a href="services.html">Usługi</a></li>
            <li><a href="kalkulatory.html">Kalkulatory</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Informacje</h4>
          <ul>
            <li><a href="contact.html">Kontakt</a></li>
            <li><a href="polityka-prywatnosci.html">Polityka prywatności</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Kontakt</h4>
          <ul>
            <li><a href="mailto:alicja.sienkiewicz@angfinanse.pl">alicja.sienkiewicz@angfinanse.pl</a></li>
            <li><a href="tel:+48665744561">+48 665 744 561</a></li>
            <li>ul. Józefa Piłsudskiego 13/1<br>66-200 Świebodzin</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© <span id="footerYear"></span> Filar. Wszelkie prawa zastrzeżone.</p>
        <p>Projekt &amp; wdrożenie: Filar</p>
      </div>
    </div>
  </footer>`;

  /* ── Inject ───────────────────────────────────────────── */
  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');

  if (headerEl) headerEl.outerHTML = headerHTML;
  if (footerEl) footerEl.outerHTML = footerHTML;

  /* ── Footer year ─────────────────────────────────────── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Active nav link ─────────────────────────────────── */
  const currentPage = document.body.dataset.page || 'home';
  document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

  /* ── Navbar scroll ───────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hamburger ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
  /* ── Accessibility toolbar (desktop only) ───────────────── */
  const a11yCSS = `
    #a11y-bar {
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: #1e293b;
      border-radius: 8px 0 0 8px;
      padding: 6px 4px;
      box-shadow: -2px 0 12px rgba(0,0,0,.25);
    }
    #a11y-bar button {
      width: 38px;
      height: 38px;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: #e2e8f0;
      font-size: .8rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .15s;
      line-height: 1;
      padding: 0;
    }
    #a11y-bar button:hover { background: rgba(255,255,255,.15); }
    #a11y-bar button.a11y-active { background: var(--color-accent, #c9a84c); color: #000; }
    #a11y-bar .a11y-sep { height: 1px; background: rgba(255,255,255,.15); margin: 2px 4px; }
    @media (max-width: 768px) { #a11y-bar { display: none !important; } }

    /* High contrast mode */
    body.hc-mode {
      --color-primary: #fff !important;
      --color-text: #fff !important;
      --color-text-light: #d1d5db !important;
      --color-accent: #ffe066 !important;
      background: #000 !important;
      color: #fff !important;
    }
    body.hc-mode #navbar,
    body.hc-mode footer { background: #111 !important; border-color: #444 !important; }
    body.hc-mode .card,
    body.hc-mode .service-card,
    body.hc-mode .testimonial-card,
    body.hc-mode .calc-panel-inner,
    body.hc-mode .calc-info-card,
    body.hc-mode .contact-info,
    body.hc-mode .contact-form { background: #111 !important; border-color: #555 !important; color: #fff !important; }
    body.hc-mode .container { background: #000 !important; }
    body.hc-mode a { color: #ffe066 !important; }
    body.hc-mode .btn-primary { background: #ffe066 !important; color: #000 !important; border-color: #ffe066 !important; }
    body.hc-mode .nav-cta { background: #ffe066 !important; color: #000 !important; border-color: #ffe066 !important; }
    body.hc-mode input,
    body.hc-mode textarea,
    body.hc-mode select { background: #1a1a1a !important; color: #fff !important; border-color: #666 !important; }
    body.hc-mode .page-hero { background: #000 !important; }
    body.hc-mode .alt { background: #000 !important; }
    body.hc-mode #hero { background: #000 !important; }
    body.hc-mode .hero-cities { background: #000 !important; border-color: #444 !important; }
    body.hc-mode #cta { background: #000 !important; }
    body.hc-mode #about-preview,
    body.hc-mode #team-preview,
    body.hc-mode #calculators-preview { background: #000 !important; }
    body.hc-mode .team-card { background: #111 !important; border-color: #555 !important; color: #fff !important; }
    body.hc-mode .stat-number { color: #ffe066 !important; }
    body.hc-mode .stat-label { color: #d1d5db !important; }
    body.hc-mode .stat-item { border-color: #444 !important; }
    body.hc-mode .btn-outline-dark { background: #000 !important; color: #fff !important; border-color: #fff !important; }
    body.hc-mode .btn-outline { background: #000 !important; color: #fff !important; border-color: #fff !important; }
    body.hc-mode .calc-tab { background: #111 !important; color: #fff !important; border-color: #555 !important; }
    body.hc-mode .calc-tab.active { background: #ffe066 !important; color: #000 !important; border-color: #ffe066 !important; }
    body.hc-mode .about-feature { background: #111 !important; color: #fff !important; border-color: #555 !important; }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = a11yCSS;
  document.head.appendChild(styleEl);

  const a11yBar = document.createElement('div');
  a11yBar.id = 'a11y-bar';
  a11yBar.setAttribute('role', 'toolbar');
  a11yBar.setAttribute('aria-label', 'Narzędzia dostępności');
  a11yBar.innerHTML = `
    <button id="a11y-increase" title="Powiększ tekst" aria-label="Powiększ tekst">A+</button>
    <button id="a11y-decrease" title="Pomniejsz tekst" aria-label="Pomniejsz tekst">A−</button>
    <button id="a11y-reset"    title="Resetuj rozmiar tekstu" aria-label="Resetuj rozmiar tekstu" style="font-size:.65rem;">A↺</button>
    <div class="a11y-sep"></div>
    <button id="a11y-contrast" title="Wysoki kontrast" aria-label="Włącz/wyłącz wysoki kontrast" style="font-size:.7rem;">WK</button>
  `;
  document.body.appendChild(a11yBar);

  // Restore saved prefs
  const savedSize = parseInt(localStorage.getItem('a11y-size') || '0', 10);
  const savedHC   = localStorage.getItem('a11y-hc') === '1';
  let currentSize = savedSize;
  if (currentSize !== 0) document.documentElement.style.fontSize = (100 + currentSize * 10) + '%';
  if (savedHC) {
    document.body.classList.add('hc-mode');
    document.getElementById('a11y-contrast').classList.add('a11y-active');
  }

  document.getElementById('a11y-increase').addEventListener('click', () => {
    if (currentSize >= 3) return;
    currentSize++;
    document.documentElement.style.fontSize = (100 + currentSize * 10) + '%';
    localStorage.setItem('a11y-size', currentSize);
  });
  document.getElementById('a11y-decrease').addEventListener('click', () => {
    if (currentSize <= -1) return;
    currentSize--;
    document.documentElement.style.fontSize = (100 + currentSize * 10) + '%';
    localStorage.setItem('a11y-size', currentSize);
  });
  document.getElementById('a11y-reset').addEventListener('click', () => {
    currentSize = 0;
    document.documentElement.style.fontSize = '';
    localStorage.setItem('a11y-size', 0);
  });
  document.getElementById('a11y-contrast').addEventListener('click', () => {
    const isHC = document.body.classList.toggle('hc-mode');
    document.getElementById('a11y-contrast').classList.toggle('a11y-active', isHC);
    localStorage.setItem('a11y-hc', isHC ? '1' : '0');
  });

})();
