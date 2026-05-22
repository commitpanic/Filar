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
          <li><a href="index.html"     data-page="home">Strona główna</a></li>
          <li><a href="about.html"     data-page="about">O nas</a></li>
          <li><a href="services.html"  data-page="services">Usługi</a></li>
          <li><a href="portfolio.html" data-page="portfolio">Portfolio</a></li>
          <li><a href="team.html"      data-page="team">Zespół</a></li>
          <li><a href="contact.html"   data-page="contact" class="nav-cta">Kontakt</a></li>
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
          <p>Profesjonalne doradztwo biznesowe. Pomagamy firmom rosnąć, zarządzać ryzykiem i osiągać wyznaczone cele.</p>
        </div>
        <div class="footer-col">
          <h4>Strony</h4>
          <ul>
            <li><a href="index.html">Strona główna</a></li>
            <li><a href="about.html">O nas</a></li>
            <li><a href="services.html">Usługi</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Informacje</h4>
          <ul>
            <li><a href="team.html">Zespół</a></li>
            <li><a href="contact.html">Kontakt</a></li>
            <li><a href="#">Polityka prywatności</a></li>
            <li><a href="#">Regulamin</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Kontakt</h4>
          <ul>
            <li><a href="mailto:biuro@filar.pl">biuro@filar.pl</a></li>
            <li><a href="tel:+48000000000">+48 000 000 000</a></li>
            <li>ul. Przykładowa 1<br>00-000 Warszawa</li>
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
})();
