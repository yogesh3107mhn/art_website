/* =========================
   NAVBAR SCROLL EFFECTS
========================= */
const nav = document.getElementById('nav');
if (nav) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    // Add/remove scrolled class for background blur
    if (currentScroll > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    // Hide nav on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 120) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });
}

/* =========================
   MOBILE BURGER MENU
========================= */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'fixed';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--cream)';
      navLinks.style.padding = '2rem';
      navLinks.style.gap = '1.5rem';
      navLinks.style.zIndex = '99';
      navLinks.style.borderBottom = '1px solid rgba(184,134,59,.2)';
    }
  });
}

/* =========================
   SCROLL REVEAL ANIMATION
========================= */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

/* =========================
   CURSOR GLOW (PREMIUM EFFECT)
========================= */
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

/* =========================
   SCROLL PROGRESS BAR
========================= */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + '%';
});

/* =========================
   MAGNETIC BUTTON EFFECT
========================= */
const buttons = document.querySelectorAll('.btn-gold, .btn-outline, .btn-outline-white, .btn-dark, .btn-ghost');
buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

/* =========================
   COUNTER ANIMATION (for elements with data-to)
========================= */
const counters = document.querySelectorAll('[data-to]');
const counterObserverCallback = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-to'), 10);
      const suffix = el.getAttribute('data-suf') || '';
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();
      function updateCounter(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.innerText = value + suffix;
        if (progress < 1) requestAnimationFrame(updateCounter);
      }
      requestAnimationFrame(updateCounter);
      counterObserverCallback.unobserve(el);
    }
  });
}, { threshold: 0.6 });
counters.forEach(counter => counterObserverCallback.observe(counter));

/* =========================
   PARALLAX EFFECT (data-parallax)
========================= */
const parallaxElements = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-parallax'));
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

/* =========================
   SMOOTH ANCHOR SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

/* =========================
   TESTIMONIAL SLIDER (if .t-card exists)
========================= */
const testimonialSlides = document.querySelectorAll('.t-card');
let currentSlide = 0;
if (testimonialSlides.length > 0) {
  function showTestimonialSlide(index) {
    testimonialSlides.forEach((slide, i) => {
      slide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      if (i === index) {
        slide.style.opacity = '1';
        slide.style.transform = 'scale(1)';
      } else {
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0.95)';
      }
    });
  }
  showTestimonialSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showTestimonialSlide(currentSlide);
  }, 4000);
}

/* =========================
   LIGHTBOX (for gallery images)
========================= */
const galleryImages = document.querySelectorAll('.gallery-item img, .gallery-mosaic img, .gal-item img');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.position = 'fixed';
lightbox.style.top = '0';
lightbox.style.left = '0';
lightbox.style.width = '100%';
lightbox.style.height = '100%';
lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
lightbox.style.display = 'none';
lightbox.style.alignItems = 'center';
lightbox.style.justifyContent = 'center';
lightbox.style.zIndex = '9999';
lightbox.style.cursor = 'pointer';
const lightboxImg = document.createElement('img');
lightboxImg.style.maxWidth = '90%';
lightboxImg.style.maxHeight = '90%';
lightboxImg.style.objectFit = 'contain';
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);
galleryImages.forEach(img => {
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});
lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});
