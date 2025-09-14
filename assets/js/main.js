// Greenscape site interactions
(function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll for hash links
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t instanceof HTMLElement && t.matches('a[href^="#"]')) {
      const href = t.getAttribute('href');
      if (href && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (nav) nav.classList.remove('open');
        }
      }
    }
  });

  // Basic form handling (no backend)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get('name') || '').toString().trim();
      const phone = (fd.get('phone') || '').toString().trim();
      if (!name || !phone) {
        status.textContent = 'Please enter your name and phone.';
        status.style.color = '#b00020';
        return;
      }
      status.style.color = '#256428';
      status.textContent = 'Thanks! We will contact you shortly.';
      form.reset();
    });
  }
})();

