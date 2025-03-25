// Scroll to top before browser auto-scrolls to #hash
if (window.location.hash) {
  window.scrollTo(0, 0);
  history.replaceState(null, null, " ");
}

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  
  // Set initial icon
  menuToggle.innerHTML = "☰";
  
  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // ADD: Scroll Lock on mobile menu open
    if (navLinks.classList.contains("active")) {
      document.body.style.overflow = "hidden";
      menuToggle.innerHTML = "✕";
    } else {
      document.body.style.overflow = "";
      menuToggle.innerHTML = "☰";
    }
  });

  // Close menu on nav link click
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      document.body.style.overflow = ""; // REMOVE scroll lock
      menuToggle.innerHTML = "☰";
    });
  });

  // Smooth scroll without # in URL
  const links = document.querySelectorAll(".nav-links a");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 60;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });

        // Remove the hash from URL
        setTimeout(() => {
          history.replaceState(null, null, " ");
        }, 500);

        navLinks.classList.remove("active");
        document.body.style.overflow = ""; // REMOVE scroll lock
        menuToggle.innerHTML = "☰";
      }
    });
  });
});

function handleNavbarStyle() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY === 0) {
    navbar.classList.add("navbar-transparent");
    navbar.classList.add("scroll-up");
    navbar.classList.remove("scroll-down");
  } else {
    navbar.classList.remove("navbar-transparent");
    navbar.classList.add("scroll-down");
    navbar.classList.remove("scroll-up");
  }
}

window.addEventListener("scroll", handleNavbarStyle);
window.addEventListener("DOMContentLoaded", handleNavbarStyle);
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

const typingElement = document.getElementById("typing");
const phrases = ["Web Developer", "Graphic Designer", "Freelancer", "Data Entry", "Game Development"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 60;
let pauseBetweenPhrases = 1500;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, typingSpeed);
    } else {
      setTimeout(typeEffect, deletingSpeed);
    }

  } else {
    typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseBetweenPhrases);
    } else {
      setTimeout(typeEffect, typingSpeed);
    }
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

const universe = document.getElementById("universe-bg");
const stars = [];
for (let i = 0; i < 150; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`;
  star.style.width = `${Math.random() * 2 + 1}px`;
  star.style.height = star.style.width;
  universe.appendChild(star);
  stars.push(star);
}

document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const offsetX = (e.clientX - centerX) / 50;
  const offsetY = (e.clientY - centerY) / 50;
  stars.forEach((star, index) => {
    star.style.transform = `translate(${offsetX * (index / 100)}px, ${offsetY * (index / 100)}px)`;
  });
});

const scrollToTopButton = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = "flex";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Section Reveal Effect with Stagger Animation
const revealSections = document.querySelectorAll("section");

revealSections.forEach(section => {
  section.classList.add("reveal-hidden");

  const children = Array.from(section.children);
  children.forEach((child, index) => {
    child.classList.add("reveal-child");
    child.style.transitionDelay = `${index * 150}ms`;
  });
});

const observerOptions = {
  threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const section = entry.target;
    const children = section.querySelectorAll(".reveal-child");

    if (entry.isIntersecting) {
      section.classList.add("reveal-visible");
      children.forEach(child => {
        child.classList.add("reveal-child-visible");
      });
    } else {
      section.classList.remove("reveal-visible");
      children.forEach(child => {
        child.classList.remove("reveal-child-visible");
      });
    }
  });
}, observerOptions);

revealSections.forEach(section => {
  revealObserver.observe(section);
});

let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  const currentScroll = window.scrollY;

  if (window.innerWidth <= 768) { // Only apply for mobile view
    if (currentScroll > lastScrollTop) {
      // Scrolling Down
      navbar.style.top = "-100px"; // Hide navbar
    } else {
      // Scrolling Up
      navbar.style.top = "0"; // Show navbar
    }
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For iOS bounce
});
