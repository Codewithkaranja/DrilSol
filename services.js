/* ===============================
   SERVICES.JS (ALIGNED)
   - matches the updated HTML a11y attrs
   - keeps your existing class hooks: mobile-active, open, menu-open, header-small, header-transparent
================================ */

/* ===============================
   ELEMENTS
=============================== */
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const header = document.querySelector("header");
const pageHeader = document.querySelector(".page-header");
let lastScrollY = window.scrollY;

/* ===============================
   HELPERS
=============================== */
const getFocusableInNav = () =>
  mainNav
    ? mainNav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
    : [];

function setNavOpen(isOpen) {
  if (!mainNav || !mobileMenuBtn) return;

  mainNav.classList.toggle("mobile-active", isOpen);
  mobileMenuBtn.classList.toggle("open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

  // a11y state for button + dropdown
  mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));

  // stagger link animations
  const links = mainNav.querySelectorAll("a");
  links.forEach((link, index) => {
    link.style.transitionDelay = isOpen ? `${index * 0.06}s` : "0s";
  });

  // close any open mobile dropdowns when closing nav
  if (!isOpen) {
    mainNav.querySelectorAll(".has-dropdown.dropdown-open").forEach((li) => {
      li.classList.remove("dropdown-open");
      const t = li.querySelector(".dropdown-toggle");
      if (t) t.setAttribute("aria-expanded", "false");
    });
  }
}

function closeNav() {
  setNavOpen(false);
}

function openNav() {
  setNavOpen(true);
}

/* ===============================
   MOBILE MENU TOGGLE
=============================== */
if (mobileMenuBtn && mainNav) {
  // initial a11y states (safe even if already set in HTML)
  mobileMenuBtn.setAttribute("aria-expanded", "false");

  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = !mainNav.classList.contains("mobile-active");
    setNavOpen(isOpen);

    // focus first link when opening (nice UX)
    if (isOpen) {
      const focusables = getFocusableInNav();
      focusables?.[0]?.focus?.();
    }
  });

  // Close menu when clicking any link (including dropdown links)
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      // allow same-page anchor behavior to continue
      closeNav();
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mainNav.classList.contains("mobile-active") &&
      !mainNav.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeNav();
    }
  });

  // Close menu on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("mobile-active")) {
      closeNav();
      mobileMenuBtn.focus?.();
    }
  });
}

/* ===============================
   HEADER SCROLL EFFECTS
=============================== */
if (header) {
  window.addEventListener(
    "scroll",
    () => {
      const current = window.scrollY;

      // Shrink header
      header.classList.toggle("header-small", current > 80);

      // Scroll direction transparency
      if (current > lastScrollY && current > 80) {
        header.classList.add("header-transparent");
      } else {
        header.classList.remove("header-transparent");
      }

      // Shadow
      header.style.boxShadow =
        current > 100 ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none";

      lastScrollY = current;
    },
    { passive: true }
  );
}

/* ===============================
   FADE-IN HEADER TEXT (optional)
   Note: services page uses .header-title/.header-subtitle,
   but this keeps compatibility if you add .animate-text later.
=============================== */
const headerTexts = document.querySelectorAll(".animate-text");
if (headerTexts.length) {
  const textObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  headerTexts.forEach((el) => {
    el.style.animationPlayState = "paused";
    textObserver.observe(el);
  });
}

/* ===============================
   SMOOTH SCROLLING (anchors)
=============================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href");

    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    // close mobile menu if open
    if (mainNav && mainNav.classList.contains("mobile-active")) {
      closeNav();
    }

    // smooth scroll
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ===============================
   FAQ ACCORDION
=============================== */
document.querySelectorAll(".faq-item").forEach((item) => {
  const q = item.querySelector(".faq-question");
  if (!q) return;

  q.addEventListener("click", () => {
    document.querySelectorAll(".faq-item").forEach((other) => {
      if (other !== item) other.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

/* ===============================
   SCROLL REVEAL (IntersectionObserver)
=============================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.2 }
);

// keep your existing hooks
document.querySelectorAll(".reveal, .page-header").forEach((el) => {
  revealObserver.observe(el);
});

/* ===============================
   PARALLAX EFFECT (Optimized)
=============================== */
let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      if (pageHeader) {
        pageHeader.style.backgroundPositionY = window.scrollY * 0.3 + "px";
      }
      ticking = false;
    });

    ticking = true;
  },
  { passive: true }
);

/* ===============================
   MOBILE DROPDOWN MENU (Services)
   - uses aria-expanded on the Services toggle
   - closes when clicking outside or navigating
=============================== */
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

dropdownToggles.forEach((toggle) => {
  // set initial state
  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", function (e) {
    if (window.innerWidth > 992) return; // desktop ignores click

    e.preventDefault();

    const li = this.closest(".has-dropdown");
    if (!li) return;

    const willOpen = !li.classList.contains("dropdown-open");

    // close other open dropdowns (mobile)
    mainNav?.querySelectorAll(".has-dropdown.dropdown-open").forEach((openLi) => {
      if (openLi !== li) {
        openLi.classList.remove("dropdown-open");
        openLi.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
      }
    });

    li.classList.toggle("dropdown-open", willOpen);
    this.setAttribute("aria-expanded", String(willOpen));
  });
});
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// close dropdown if user clicks outside (on mobile)
document.addEventListener("click", (e) => {
  if (window.innerWidth > 992) return;

  dropdownToggles.forEach((toggle) => {
    const li = toggle.closest(".has-dropdown");
    if (!li) return;

    const clickedInside = li.contains(e.target);
    if (!clickedInside && li.classList.contains("dropdown-open")) {
      li.classList.remove("dropdown-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});