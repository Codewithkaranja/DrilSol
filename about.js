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

      // Team member hover animation
      const teamMembers = document.querySelectorAll(".team-member");
      teamMembers.forEach((member) => {
        member.addEventListener("mouseenter", () => {
          member.style.transform = "translateY(-10px)";
        });

        member.addEventListener("mouseleave", () => {
          member.style.transform = "translateY(0)";
        });
      });