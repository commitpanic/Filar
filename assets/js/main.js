/**
 * main.js — Filar site interactions
 * - Intersection Observer (reveal animations + stat counters)
 * - FAQ accordion
 * - Testimonials slider (simple, no dependency)
 * - EmailJS contact form
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════════
     REVEAL ANIMATIONS
  ══════════════════════════════════════════════ */
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
  );

  if (revealEls.length) {
    const revealObs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => el.classList.add('visible'), Number(delay));
            revealObs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ══════════════════════════════════════════════
     STAT COUNTERS
  ══════════════════════════════════════════════ */
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length) {
    const countObs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el      = entry.target;
          const target  = parseInt(el.dataset.count, 10);
          const suffix  = el.dataset.suffix || '';
          const dur     = 1800;
          const step    = 16;
          const inc     = target / (dur / step);
          let current   = 0;

          const tick = () => {
            current = Math.min(current + inc, target);
            el.textContent = Math.floor(current) + suffix;
            if (current < target) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          countObs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(el => countObs.observe(el));
  }

  /* ══════════════════════════════════════════════
     FAQ ACCORDION
  ══════════════════════════════════════════════ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');

      // Close all
      faqItems.forEach(i => {
        i.querySelector('.faq-question')?.classList.remove('open');
        i.querySelector('.faq-answer')?.classList.remove('open');
      });

      // Open clicked (unless it was already open)
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  /* ══════════════════════════════════════════════
     TESTIMONIALS SLIDER (vanilla)
  ══════════════════════════════════════════════ */
  const slider = document.querySelector('.testimonials-slider');
  if (slider) {
    const track   = slider.querySelector('.slider-track');
    const slides  = slider.querySelectorAll('.testimonial-card');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dotsEl  = slider.querySelector('.slider-dots');

    let current = 0;
    const total = slides.length;

    // Build dots
    if (dotsEl) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Opinia ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
      });
    }

    const goTo = idx => {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      slider.querySelectorAll('.slider-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
    };

    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));

    // Auto-advance every 5 s
    let autoplay = setInterval(() => goTo(current + 1), 5000);
    slider.addEventListener('mouseenter', () => clearInterval(autoplay));
    slider.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current + 1), 5000);
    });

    // Touch / swipe
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });
  }

  /* ══════════════════════════════════════════════
     EMAILJS CONTACT FORM
  ══════════════════════════════════════════════ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const statusEl  = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    /* Simple field validator */
    const validators = {
      name:    v => v.trim().length >= 2,
      email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      subject: v => v.trim().length >= 2,
      message: v => v.trim().length >= 10,
    };

    const showError = (field, show) => {
      const input = contactForm.querySelector(`[name="${field}"]`);
      const msg   = contactForm.querySelector(`[data-error="${field}"]`);
      if (!input || !msg) return;
      input.classList.toggle('error', show);
      msg.classList.toggle('visible', show);
    };

    const validateAll = () => {
      let valid = true;
      Object.entries(validators).forEach(([field, fn]) => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (!input) return;
        const ok = fn(input.value);
        showError(field, !ok);
        if (!ok) valid = false;
      });
      return valid;
    };

    // Live validation
    contactForm.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('blur', () => {
        const fn = validators[el.name];
        if (fn) showError(el.name, !fn(el.value));
      });
    });

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validateAll()) return;

      submitBtn.disabled    = true;
      submitBtn.textContent = 'Wysyłanie…';
      if (statusEl) { statusEl.className = 'form-status'; statusEl.textContent = ''; }

      const params = {
        from_name: contactForm.name.value.trim(),
        from_email: contactForm.email.value.trim(),
        subject:   contactForm.subject.value.trim(),
        message:   contactForm.message.value.trim(),
      };

      try {
        /* Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with real values from emailjs.com */
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params);
        if (statusEl) {
          statusEl.className  = 'form-status success';
          statusEl.textContent = '✓ Wiadomość wysłana! Odezwiemy się wkrótce.';
        }
        contactForm.reset();
      } catch (err) {
        console.error('EmailJS error:', err);
        if (statusEl) {
          statusEl.className  = 'form-status error-status';
          statusEl.textContent = '✗ Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń do nas.';
        }
      } finally {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Wyślij wiadomość';
      }
    });
  }

  /* ══════════════════════════════════════════════
     SMOOTH SCROLL (links starting with #)
  ══════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
