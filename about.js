document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // Mobile Menu Toggle with Staggered Links
  // -------------------------------
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");

      const links = mainNav.querySelectorAll("a");
      links.forEach((link, index) => {
        // stagger animation
        link.style.transitionDelay = mainNav.classList.contains("active")
          ? `${index * 0.1}s`
          : "0s";
      });
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => mainNav.classList.remove("active"));
    });
  }

  // -------------------------------
  // Fade-in header text on scroll
  // -------------------------------
  const headerTexts = document.querySelectorAll(".animate-text");
  if (headerTexts.length > 0) {
    const headerObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    headerTexts.forEach(el => {
      el.style.animationPlayState = "paused";
      headerObserver.observe(el);
    });
  }

  // -------------------------------
  // Parallax effect on header
  // -------------------------------
  const header = document.querySelector(".page-header");
  if (header) {
    window.addEventListener("scroll", () => {
      const offset = window.pageYOffset;
      header.style.backgroundPositionY = offset * 0.5 + "px";
    });
  }

  // -------------------------------
  // Smooth scrolling for anchor links
  // -------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // -------------------------------
  // Sticky header shadow on scroll
  // -------------------------------
  const siteHeader = document.querySelector("header");
  if (siteHeader) {
    window.addEventListener("scroll", () => {
      siteHeader.style.boxShadow = window.scrollY > 100
        ? "0 4px 12px rgba(0, 0, 0, 0.1)"
        : "none";
    });
  }

  // -------------------------------
  // Team member hover animation
  // -------------------------------
  const teamMembers = document.querySelectorAll(".team-member");
  if (teamMembers.length > 0) {
    teamMembers.forEach(member => {
      member.addEventListener("mouseenter", () => {
        member.style.transform = "translateY(-10px)";
        member.style.transition = "transform 0.3s ease";
      });
      member.addEventListener("mouseleave", () => {
        member.style.transform = "translateY(0)";
        member.style.transition = "transform 0.3s ease";
      });
    });
  }

  // -------------------------------
  // Company Story Fade-in Paragraphs
  // -------------------------------
  const storyParagraphs = document.querySelectorAll(".story-text p");
  if (storyParagraphs.length > 0) {
    const storyObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    storyParagraphs.forEach(p => storyObserver.observe(p));
  }
});
