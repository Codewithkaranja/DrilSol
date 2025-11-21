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

      // Project Filtering
      const filterButtons = document.querySelectorAll(".filter-btn");
      const projectCards = document.querySelectorAll(".project-card");

      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          // Add active class to clicked button
          button.classList.add("active");

          const filterValue = button.getAttribute("data-filter");

          projectCards.forEach((card) => {
            if (
              filterValue === "all" ||
              card.getAttribute("data-category").includes(filterValue)
            ) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          });
        });
      });

      // Image Modal
      const modal = document.getElementById("imageModal");
      const modalImage = document.querySelector(".modal-image");
      const closeModal = document.querySelector(".close-modal");
      const galleryItems = document.querySelectorAll(".gallery-item");

      galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
          modal.style.display = "block";
          // In a real implementation, you would set the actual image source
          // modalImage.src = item.querySelector('img').src;
        });
      });

      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
      });

      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
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