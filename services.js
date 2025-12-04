/* ===============================
      MOBILE MENU TOGGLE & HEADER EFFECTS
=============================== */
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const header = document.querySelector("header");
const pageHeader = document.querySelector(".page-header");
let lastScrollY = window.scrollY;

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("mobile-active");
    mobileMenuBtn.classList.toggle("open");
    
    // Add body class to prevent scrolling
    document.body.classList.toggle("menu-open", mainNav.classList.contains("mobile-active"));

    // stagger links animation
    const links = mainNav.querySelectorAll("a");
    links.forEach((link, index) => {
      link.style.transitionDelay = mainNav.classList.contains("mobile-active")
        ? `${index * 0.1}s`
        : "0s";
    });
  });

  // Close menu when a link is clicked
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("mobile-active");
      mobileMenuBtn.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });

  // Close menu when clicking outside (optional but good UX)
  document.addEventListener("click", (e) => {
    if (mainNav.classList.contains("mobile-active") && 
        !mainNav.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
      mainNav.classList.remove("mobile-active");
      mobileMenuBtn.classList.remove("open");
      document.body.classList.remove("menu-open");
    }
  });
}

// Header scroll effects
if (header) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // Shrink header
    if (currentScroll > 80) {
      header.classList.add("header-small");
    } else {
      header.classList.remove("header-small", "header-transparent");
    }

    // Scroll direction → transparency
    if (currentScroll > lastScrollY && currentScroll > 80) {
      header.classList.add("header-transparent");
    } else if (currentScroll < lastScrollY) {
      header.classList.remove("header-transparent");
    }

    // Sticky shadow
    header.style.boxShadow = currentScroll > 100
      ? "0 4px 12px rgba(0, 0, 0, 0.1)"
      : "none";

    // Parallax effect
    if (pageHeader) {
      pageHeader.style.backgroundPositionY = currentScroll * 0.5 + "px";
    }

    lastScrollY = currentScroll;
  });
}

// Fade-in header texts
const headerTexts = document.querySelectorAll(".animate-text");
if (headerTexts.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  headerTexts.forEach(el => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
}

// ========= Smooth Scrolling =========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    // Close mobile menu if open
    if (mainNav && mainNav.classList.contains("mobile-active")) {
      mainNav.classList.remove("mobile-active");
      mobileMenuBtn.classList.remove("open");
      document.body.classList.remove("menu-open");
    }
    
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    e.preventDefault();
    document.querySelector(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
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

// Enable dropdown open on mobile
document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    // If this link has a real page (services.html), allow normal click on desktop
    if (window.innerWidth > 992) return;

    // Prevent navigation (mobile only)
    e.preventDefault();

    const parent = this.parentElement;
    parent.classList.toggle("dropdown-open");
  });
});
