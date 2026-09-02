/* Sue Ho — portfolio behaviour.
   Four small things: mobile menu, scroll state, scrollspy, reveal-on-scroll. */

(function () {
  'use strict';

  /* ---- Current year in the footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Tapping a link should close the menu again.
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---- Header border once the page scrolls ---- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Scrollspy: highlight the section you are reading ---- */
  // Skip a bare "#" href: querySelector('#') throws a SyntaxError, which would
  // kill the rest of this file — including the scroll reveal below.
  var links = Array.prototype.slice
    .call(document.querySelectorAll('.nav__menu a[href^="#"]'))
    .filter(function (link) { return link.getAttribute('href').length > 1; });

  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---- Reveal sections as they enter the viewport ---- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll('.section .container > *, .hero__text, .hero__portrait');

  if (!reduceMotion && 'IntersectionObserver' in window) {
    Array.prototype.forEach.call(revealTargets, function (el) { el.classList.add('reveal'); });

    // threshold must stay 0: a percentage threshold can never be met by a block
    // taller than the viewport (the projects grid on a short window), which
    // would leave that section permanently invisible.
    var revealer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0 });

    Array.prototype.forEach.call(revealTargets, function (el) { revealer.observe(el); });

    // Safety net: if anything goes wrong with the observer, never leave the
    // page blank. Show everything after a few seconds regardless.
    window.setTimeout(function () {
      Array.prototype.forEach.call(revealTargets, function (el) {
        el.classList.add('is-visible');
      });
    }, 3000);
  }
})();
