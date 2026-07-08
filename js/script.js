(function () {
  'use strict';

  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal animation ---------- */
  var revealItems = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  /* ---------- Contact form handling ---------- */
  var form = document.getElementById('contact-form');
  var successMessage = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Hinweis: Hier ist aktuell kein echter Versand angebunden.
      // Für den Produktivbetrieb an ein Formular-Backend anbinden,
      // z. B. eigenes Skript, Formspree oder einen serverlosen Endpunkt.
      var submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) { submitButton.disabled = true; }

      window.setTimeout(function () {
        if (successMessage) {
          successMessage.hidden = false;
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        form.reset();
        if (submitButton) { submitButton.disabled = false; }
      }, 400);
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
