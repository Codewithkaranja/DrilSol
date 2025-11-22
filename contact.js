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

      // Contact Form Submission
      const contactForm = document.getElementById("contactForm");
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form values
        const firstName = document.getElementById("firstName").value;
        const phone = document.getElementById("phone").value;

        // Show success message
        alert(
          `Thank you ${firstName}! We have received your inquiry and will contact you at ${phone} within 24 hours.`
        );

        // Reset form
        contactForm.reset();
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

      // Method card hover animation
      const methodCards = document.querySelectorAll(".method-card");
      methodCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          card.style.transform = "translateY(-10px)";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "translateY(0)";
        });
      });
      window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 60);
});
