/*==========================================================

Ahmed Al Salih
Executive Portfolio

script.js

==========================================================*/

"use strict";

/*==========================================================

GLOBAL

==========================================================*/

const body = document.body;

const header = document.querySelector("header");

const backToTop = document.getElementById("backToTop");

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-menu a");

const revealItems = document.querySelectorAll(".reveal");

/*==========================================================

PAGE LOADED

==========================================================*/

window.addEventListener("load", () => {
  body.classList.add("loaded");
});

/*==========================================================

STICKY NAVIGATION

==========================================================*/

function updateHeader() {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

updateHeader();

window.addEventListener("scroll", updateHeader);

/*==========================================================

BACK TO TOP

==========================================================*/

function toggleBackButton() {
  if (window.scrollY > 700) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

toggleBackButton();

window.addEventListener("scroll", toggleBackButton);

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

/*==========================================================

ACTIVE NAVIGATION

==========================================================*/

function updateNavigation() {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 180;

    const height = section.offsetHeight;

    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === "#" + current) {
      link.classList.add("active");
    }
  });
}

updateNavigation();

window.addEventListener("scroll", updateNavigation);

/*==========================================================

SCROLL REVEAL

==========================================================*/

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },

  {
    threshold: 0.15,
  },
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

/*==========================================================

SCROLL PROGRESS BAR

==========================================================*/

const progressBar = document.querySelector(".progress-bar");

function updateProgressBar() {
  const scrollTop = window.pageYOffset;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = (scrollTop / documentHeight) * 100;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

window.addEventListener("scroll", updateProgressBar);

/*==========================================================

ANIMATED COUNTERS

==========================================================*/

const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = parseInt(counter.dataset.counter);

      const duration = 1800;

      const start = 0;

      let startTime = null;

      function animate(time) {
        if (!startTime) startTime = time;

        const progress = Math.min((time - startTime) / duration, 1);

        const value = Math.floor(progress * (target - start));

        counter.textContent = value.toLocaleString() + "+";

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target.toLocaleString() + "+";
        }
      }

      requestAnimationFrame(animate);

      counterObserver.unobserve(counter);
    });
  },

  {
    threshold: 0.45,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

/*==========================================================

MOUSE GLOW

==========================================================*/

const glow = document.createElement("div");

glow.className = "mouse-glow";

document.body.appendChild(glow);

let mouseX = 0;

let mouseY = 0;

let glowX = 0;

let glowY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;

  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.12;

  glowY += (mouseY - glowY) * 0.12;

  glow.style.transform = `translate(${glowX - 200}px,${glowY - 200}px)`;

  requestAnimationFrame(animateGlow);
}

animateGlow();

/*==========================================================

SPOTLIGHT CARDS

==========================================================*/

const cards = document.querySelectorAll(
  ".vision-card,.project-card,.research-card,.profile-card,.recognition-card",
);

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);

    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

/*==========================================================

PARALLAX HERO

==========================================================*/

const heroImage = document.querySelector(".image-wrapper");

window.addEventListener("mousemove", (e) => {
  if (!heroImage) return;

  const x = (e.clientX - window.innerWidth / 2) / 60;

  const y = (e.clientY - window.innerHeight / 2) / 60;

  heroImage.style.transform = `translate(${x}px,${y}px)`;
});

/*==========================================================

SMOOTH SECTION SCROLL

==========================================================*/

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");

    if (id === "#") return;

    const section = document.querySelector(id);

    if (!section) return;

    e.preventDefault();

    window.scrollTo({
      top: section.offsetTop - 80,

      behavior: "smooth",
    });
  });
});

/*==========================================================

COMMAND PALETTE (CTRL + K)

==========================================================*/

const commandPalette = document.querySelector(".command-palette");
const commandOverlay = document.querySelector(".command-overlay");
const commandInput = document.querySelector("#command-search");

function openPalette() {
  commandOverlay.classList.add("show");
  commandPalette.classList.add("show");

  if (commandInput) {
    commandInput.focus();
  }
}

function closePalette() {
  commandOverlay.classList.remove("show");
  commandPalette.classList.remove("show");
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();

    openPalette();
  }

  if (e.key === "Escape") {
    closePalette();
  }
});

if (commandOverlay) {
  commandOverlay.addEventListener("click", closePalette);
}

/*==========================================================

COMMAND LINKS

==========================================================*/

document.querySelectorAll(".command-item").forEach((item) => {
  item.addEventListener("click", () => {
    const url = item.dataset.url;

    const target = item.dataset.target;

    closePalette();

    if (target) {
      document.querySelector(target)?.scrollIntoView({
        behavior: "smooth",
      });
    }

    if (url) {
      window.open(url, "_blank");
    }
  });
});

/*==========================================================

MAGNETIC BUTTONS

==========================================================*/

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 8;

    const moveY = (y - rect.height / 2) / 8;

    button.style.transform = `translate(${moveX}px,${moveY}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

/*==========================================================

FLOATING PARTICLES

==========================================================*/

const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

  const particles = [];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: Math.random() * canvas.width,

      y: Math.random() * canvas.height,

      r: Math.random() * 2 + 1,

      dx: (Math.random() - 0.5) * 0.4,

      dy: (Math.random() - 0.5) * 0.4,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(91,140,255,.45)";

    particles.forEach((p) => {
      ctx.beginPath();

      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

      ctx.fill();

      p.x += p.dx;

      p.y += p.dy;

      if (p.x < 0) p.x = canvas.width;

      if (p.x > canvas.width) p.x = 0;

      if (p.y < 0) p.y = canvas.height;

      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;
  });
}

/*==========================================================

LAZY IMAGE FADE-IN

==========================================================*/

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded");

      imageObserver.unobserve(entry.target);
    }
  });
});

images.forEach((img) => {
  imageObserver.observe(img);
});

/*==========================================================

PERFORMANCE

==========================================================*/

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateProgressBar();

      updateNavigation();

      toggleBackButton();

      updateHeader();

      ticking = false;
    });

    ticking = true;
  }
});
