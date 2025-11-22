// ========= Mobile Menu =========
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");

mobileMenuBtn.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("active");
  mobileMenuBtn.classList.toggle("open", isOpen);
});

// Close menu when clicking a link
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("active");
    mobileMenuBtn.classList.remove("open");
  });
});

// ========= Smooth Scrolling =========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    e.preventDefault();
    document.querySelector(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// ========= Sticky Header Background =========
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 100);
});

// ========= FAQ Accordion =========
document.querySelectorAll(".faq-item").forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    document.querySelectorAll(".faq-item").forEach(other => {
      if (other !== item) other.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

// ========= Scroll Reveal (Intersection Observer) =========
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal, .page-header").forEach(el => observer.observe(el));

// ========= Parallax Background (Smooth & Optimized) =========
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const headerBg = document.querySelector(".page-header");
      if (headerBg) {
        headerBg.style.backgroundPositionY = window.scrollY * 0.3 + "px";
      }
      ticking = false;
    });
    ticking = true;
  }
});
// ===== Scroll Reveal + Parallax =====
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".page-header");
  const revealElements = document.querySelectorAll(".reveal");

  // Intersection Observer for reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, { threshold: 0.3 }
  );

  // Observe header + other sections
  if(header) observer.observe(header);
  revealElements.forEach(el => observer.observe(el));

  // Parallax effect for header
  window.addEventListener("scroll", () => {
    if(header) {
      header.style.backgroundPositionY = window.scrollY * 0.4 + "px";
    }
  });
});

