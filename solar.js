// Mobile Menu Toggle
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      const mainNav = document.getElementById("mainNav");

      mobileMenuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("active");
      });

      // Close mobile menu when clicking on a link
      const navLinks = document.querySelectorAll("nav a");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mainNav.classList.remove("active");
        });
      });

      // System Tabs
      const systemTabs = document.querySelectorAll(".system-tab");
      const systemContents = document.querySelectorAll(".system-content");

      systemTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          // Remove active class from all tabs and contents
          systemTabs.forEach((t) => t.classList.remove("active"));
          systemContents.forEach((c) => c.classList.remove("active"));

          // Add active class to clicked tab
          tab.classList.add("active");

          // Show corresponding content
          const tabId = tab.getAttribute("data-tab");
          document.getElementById(tabId).classList.add("active");
        });
      });

      // FAQ Accordion
      const faqItems = document.querySelectorAll(".faq-item");

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
          // Close all other items
          faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("active");
            }
          });

          // Toggle current item
          item.classList.toggle("active");
        });
      });

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
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

      // Header background on scroll
      window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 100) {
          header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
        } else {
          header.style.boxShadow = "none";
        }
      });

      // Benefit card hover animation
      const benefitCards = document.querySelectorAll(".benefit-card");
      benefitCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-10px)";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0)";
        });
      });

      var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });