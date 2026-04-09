/* ===========================
   MOBILE UI（ハンバーガー・FAB）
   =========================== */
document.body.insertAdjacentHTML('beforeend', `
  <button class="mob-menu-btn" id="mobMenuBtn" aria-label="メニュー">
    <span></span><span></span><span></span>
  </button>
  <div class="mob-menu" id="mobMenu">
    <a href="index.html">Home</a>
    <a href="studio.html">nana studio</a>
    <a href="nam.html">nam</a>
    <a href="contact.html">Contact</a>
  </div>
  <div class="mob-overlay" id="mobOverlay"></div>
  <a href="contact.html" class="contact-fab">お問い合わせ</a>
`);

const mobBtn     = document.getElementById('mobMenuBtn');
const mobMenu    = document.getElementById('mobMenu');
const mobOverlay = document.getElementById('mobOverlay');

function closeMobMenu() {
  mobBtn.classList.remove('open');
  mobMenu.classList.remove('open');
  mobOverlay.classList.remove('open');
}

mobBtn.addEventListener('click', () => {
  mobBtn.classList.toggle('open');
  mobMenu.classList.toggle('open');
  mobOverlay.classList.toggle('open');
});
mobOverlay.addEventListener('click', closeMobMenu);
mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobMenu));

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

// Video thumbnail → click to play
document.querySelectorAll('.video-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const id = thumb.dataset.id;
    thumb.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });
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
