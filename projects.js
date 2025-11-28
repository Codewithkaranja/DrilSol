// ------- MOBILE MENU TOGGLE -------
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll("nav a");

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
    });
  });
}

// ------- PROJECT FILTERING -------
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.dataset.filter;

    projectCards.forEach(card => {
      card.style.display =
        filterValue === "all" || card.dataset.category.includes(filterValue)
          ? "block"
          : "none";
    });
  });
});

// ------- IMAGE MODAL -------
const modal = document.getElementById("imageModal");
const modalImage = document.querySelector(".modal-image");
const closeModal = document.querySelector(".close-modal");
const galleryItems = document.querySelectorAll(".gallery-item");

if (modal && modalImage && closeModal) {
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      modal.style.display = "flex";
      const imgSrc = item.querySelector("img")?.src;
      if (imgSrc) modalImage.src = imgSrc;
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
}

// ------- SMOOTH SCROLLING --------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();

    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});

// ------- HEADER SCROLL EFFECT ------
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 100);
});

// ------- COUNT-UP STATS ANIMATION -------
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-value-large");
  const speed = 200;

  const animateCount = counter => {
    const target = +counter.dataset.target;
    const count = +counter.innerText;

    const increment = Math.ceil(target / speed);

    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(() => animateCount(counter), 30);
    } else {
      counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
    }
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => {
    const cleanNumber = counter.innerText.replace(/[+%]/g, "");
    counter.dataset.target = cleanNumber;
    counter.innerText = "0";
    observer.observe(counter);
  });
});

// Swiper Client Project Gallery Slider
const clientSwiper = new Swiper(".clients-swiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  centeredSlides: true,
  grabCursor: true,
  autoplay: {
    delay: 1800,
    disableOnInteraction: false,
  },
  breakpoints: {
    1024: { slidesPerView: 4 },
    768: { slidesPerView: 3 },
    480: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
});

const caseSwiper = new Swiper('.case-swiper', {
  slidesPerView: 1.1,
  spaceBetween: 30,
  loop: true, // <-- this makes it endless
  centeredSlides: true,
  grabCursor: true,
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false, // <-- continues autoplay even after interaction
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: { slidesPerView: 1.2 },
    1024: { slidesPerView: 1.5 },
  },
});
