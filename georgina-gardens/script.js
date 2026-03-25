// ============================================
//  GEORGINA GARDENS HOTEL — script.js
//  Developer: Reon Ward | +256 709 884 276
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL EFFECT ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    // Back to top
    document.getElementById('backToTop').classList.toggle('show', window.scrollY > 400);
  });

  // ---- HAMBURGER MOBILE MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });

  // ---- DARK MODE TOGGLE ----
  const darkBtn = document.getElementById('darkToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    darkBtn.textContent = '☀️';
  }
  darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    darkBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // ---- HERO IMAGE SLIDER ----
  const slides = document.querySelectorAll('.hero-slide');
  let current = 0;

  // Create dots
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'hero-dots';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  document.querySelector('.hero').appendChild(dotsContainer);

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }

  let sliderInterval = setInterval(() => goToSlide(current + 1), 5000);
  dotsContainer.addEventListener('click', () => {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(() => goToSlide(current + 1), 5000);
  });

  // ---- MENU TABS ----
  document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.menu-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
  });

  // ---- GALLERY LIGHTBOX ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const bg = item.style.backgroundImage;
      const url = bg.replace(/url\(["']?/, '').replace(/["']?\)$/, '');
      lightboxImg.src = url;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ---- BOOKING FORM (Formspree) ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const success = document.getElementById('formSuccess');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      success.style.display = 'none';
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          success.style.color = '';
          success.textContent = '✅ Booking request sent! We will reply within 24 hours.';
          success.style.display = 'block';
          form.reset();
          setTimeout(() => success.style.display = 'none', 6000);
        } else {
          success.style.color = '#c0392b';
          success.textContent = '❌ Something went wrong. Please WhatsApp us directly on +256 709 884 276.';
          success.style.display = 'block';
        }
      } catch {
        success.style.color = '#c0392b';
        success.textContent = '❌ No internet connection. Please WhatsApp us on +256 709 884 276.';
        success.style.display = 'block';
      }
      btn.textContent = 'Send Booking Request';
      btn.disabled = false;
    });
  }

  // ---- SCROLL REVEAL ----
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // ---- BACK TO TOP ----
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- SMOOTH ACTIVE NAV LINK ON SCROLL ----
  const sections = document.querySelectorAll('section[id]');
  const navA = document.querySelectorAll('.nav-links a');
  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navA.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--gold)';
      }
    });
  };
  window.addEventListener('scroll', highlightNav);

});