/* ===========================
   RIPPLE ON BUTTONS
   =========================== */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

/* ===========================
   SCROLL FADE-IN
   =========================== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  'section .card, section .stat-item, section .faq-item, .hero h1, .hero p, .hero .btn-group, .section-title, .section-desc, .section-label, table, .stats'
).forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 0.07}s`;
  observer.observe(el);
});

// Flow steps: staggered animation
const flowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.flowDelay || '0s';
      el.style.animationDelay = delay;
      el.classList.add('flow-visible');
      flowObserver.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.flow-step').forEach((el, i) => {
  el.dataset.flowDelay = `${i * 0.1}s`;
  el.addEventListener('animationend', () => {
    el.classList.remove('flow-visible');
    el.style.opacity = '1';
  }, { once: true });
  flowObserver.observe(el);
});
