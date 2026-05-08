/* post-enhancements.js
   Reading progress bar + active TOC section highlighting
   Drop in posts/01-imd-gridded-data/ and reference in YAML:
     format:
       html:
         include-after-body: post-enhancements.js
*/

(function () {
  'use strict';

  /* ── Reading Progress Bar ─────────────────────────────── */
  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    document.documentElement.style.setProperty('--scroll-progress', pct.toFixed(2) + '%');
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ── Active TOC Section Highlighting ─────────────────── */
  const tocLinks = document.querySelectorAll('#TOC a');
  if (tocLinks.length === 0) return;

  const headings = Array.from(
    document.querySelectorAll('h2[id], h3[id]')
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach((link) => {
            link.classList.remove('toc-active-link');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('toc-active-link');
            }
          });
        }
      });
    },
    {
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0,
    }
  );

  headings.forEach((h) => observer.observe(h));
})();
