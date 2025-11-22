document.addEventListener("DOMContentLoaded", () => {
  // ===== Mobile Menu Toggle =====
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
      });
    });
  }

  // ===== Form Submission =====
  const inquiryForm = document.getElementById("inquiryForm");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thank you for your inquiry! We will contact you shortly.");
      inquiryForm.reset();
    });
  }

  // ===== Smooth Scrolling for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== Header Shadow on Scroll =====
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow = window.scrollY > 100
        ? "0 4px 12px rgba(0, 0, 0, 0.1)"
        : "none";
    });
  }

  // ===== Hero Image Slideshow =====
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove("active"));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  if (slides.length > 0) {
    setInterval(nextSlide, 5000); // Slide every 5s
  }

  // ===== Scroll Down Arrow =====
  const scrollDown = document.querySelector(".scroll-down");
  if (scrollDown) {
    scrollDown.addEventListener("click", () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }

  // ===== Typewriter Effect =====
  const typewriterElement = document.getElementById("typewriter");
  const words = ["DrilSol (EA)", "Borehole Drilling", "Pump Installation", "Irrigation Systems", "Solar Water Systems"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    if (!typewriterElement) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeWriter, typeSpeed);
  }

  if (typewriterElement) {
    setTimeout(typeWriter, 500);
  }
});
