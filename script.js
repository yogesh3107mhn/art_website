/* =========================
   GLOBAL INIT
========================= */
document.documentElement.classList.add("js");

/* =========================
   RAF SCROLL ENGINE (SMOOTH)
========================= */
let scrollY = window.scrollY;
let targetScrollY = window.scrollY;

const lerp = (a, b, t) => a + (b - a) * t;

function smoothScroll() {
  targetScrollY = window.scrollY;
  scrollY = lerp(scrollY, targetScrollY, 0.08);

  document.body.style.setProperty("--scroll", scrollY);

  requestAnimationFrame(smoothScroll);
}
smoothScroll();


/* =========================
   NAVBAR (SMART + PREMIUM)
========================= */
const nav = document.querySelector(".nav");

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const current = window.scrollY;

  // blur + shrink
  if (current > 60) {
    nav.classList.add("nav-scrolled");
  } else {
    nav.classList.remove("nav-scrolled");
  }

  // hide on scroll down
  if (current > lastScroll && current > 120) {
    nav.style.transform = "translateY(-100%)";
  } else {
    nav.style.transform = "translateY(0)";
  }

  lastScroll = current;
});


/* =========================
   MOBILE MENU (ANIMATED)
========================= */
const burger = document.getElementById("burger");
const mobNav = document.getElementById("mobNav");
const mobOv = document.getElementById("mobOv");

function toggleMenu() {
  burger.classList.toggle("active");
  mobNav.classList.toggle("open");
  mobOv.classList.toggle("show");
  document.body.classList.toggle("no-scroll");
}

burger?.addEventListener("click", toggleMenu);
mobOv?.addEventListener("click", toggleMenu);


/* =========================
   SCROLL REVEAL (INTERSECTION)
========================= */
const revealEls = document.querySelectorAll(".rev");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

revealEls.forEach(el => revealObserver.observe(el));


/* =========================
   COUNTER (SMOOTH + CLEAN)
========================= */
const counters = document.querySelectorAll("[data-to]");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = +el.dataset.to;
    const suffix = el.dataset.suf || "";

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.innerText = value + suffix;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

counters.forEach(c => counterObserver.observe(c));


/* =========================
   MAGNETIC BUTTON (REFINED)
========================= */
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;

    btn.style.transform = `translate(${x}px, ${y}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});


/* =========================
   CURSOR GLOW (PREMIUM UX)
========================= */
const cursor = document.createElement("div");
cursor.className = "cursor-glow";
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});


/* =========================
   PARALLAX DEPTH SYSTEM
========================= */
const parallaxEls = document.querySelectorAll("[data-parallax]");

window.addEventListener("scroll", () => {
  const offset = window.scrollY;

  parallaxEls.forEach(el => {
    const speed = el.dataset.parallax;
    el.style.transform = `translateY(${offset * speed}px)`;
  });
});


/* =========================
   COURSE FILTER (SMOOTH)
========================= */
const filterBtns = document.querySelectorAll(".tab-btn");
const courseCards = document.querySelectorAll("[data-cat]");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".tab-btn.active")?.classList.remove("active");
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    courseCards.forEach(card => {
      if (filter === "all" || card.dataset.cat === filter) {
        card.style.opacity = "0";
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
        }, 100);
      } else {
        card.style.opacity = "0";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});


/* =========================
   TESTIMONIAL SLIDER (SMOOTH FADE)
========================= */
const slides = document.querySelectorAll(".t-card");
let current = 0;

function showSlide(i) {
  slides.forEach((s, index) => {
    s.style.opacity = index === i ? "1" : "0";
    s.style.transform = index === i ? "scale(1)" : "scale(0.95)";
  });
}

if (slides.length > 0) {
  showSlide(current);

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 4000);
}


/* =========================
   LIGHTBOX (GALLERY)
========================= */
const lightbox = document.getElementById("lb");
const lbImg = lightbox?.querySelector("img");

document.querySelectorAll(".gal-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lbImg.src = img.src;
  });
});

document.getElementById("lbCl")?.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox?.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});


/* =========================
   SCROLL PROGRESS BAR
========================= */
const progress = document.createElement("div");
progress.className = "scroll-progress";
document.body.appendChild(progress);

window.addEventListener("scroll", () => {
  const height = document.body.scrollHeight - window.innerHeight;
  const percent = (window.scrollY / height) * 100;
  progress.style.width = percent + "%";
});


/* =========================
   SMOOTH ANCHOR SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth"
    });
  });
});