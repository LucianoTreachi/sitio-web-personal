// DOM ELEMENTS
const skipLink = document.querySelector(".skip-link");
const heroTitle = document.querySelector(".hero-title");
const navLogo = document.querySelector(".nav-logo");
const header = document.querySelector("header");
const openMenuButton = document.querySelector(".open-menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".overlay");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll('section');

// Media query (57rem = 912px)
const mediaQuery = window.matchMedia("(max-width: 57rem)");

// SKIP TO MAIN CONTENT
skipLink.addEventListener("click", (event) => {
  event.preventDefault();

  if (heroTitle) {
    heroTitle.setAttribute("tabindex", "-1");
    heroTitle.focus();
  }

  skipLink.blur();
});

skipLink.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    skipLink.blur();
    navLogo.focus();
  }
});

// NAVBAR
function disableNavbar() {
  navbar.setAttribute("aria-hidden", "true");
  navbar.setAttribute("inert", "");
}

function enableNavbar() {
  navbar.setAttribute("aria-hidden", "false");
  navbar.removeAttribute("inert");
}

function updateNavbarVisibility() {
  if (mediaQuery.matches) {
    if (!navbar.classList.contains("active")) {
      disableNavbar();
    }
  } else {
    enableNavbar();
  }
}

function openNavbar() {
  navbar.classList.add("active");
  overlay.classList.add("active");
  enableNavbar();
  openMenuButton.setAttribute("aria-expanded", "true");
  openMenuButton.setAttribute("aria-hidden", "true");
  closeMenuButton.focus();
}

function closeNavbar(shouldFocus = false) {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");
  openMenuButton.setAttribute("aria-hidden", "false");

  if (shouldFocus) {
    openMenuButton.focus();
  }

  if (mediaQuery.matches && !navbar.classList.contains("active")) {
    disableNavbar();
  }
}

openMenuButton.addEventListener('click', openNavbar);
closeMenuButton.addEventListener("click", () => closeNavbar(true));
overlay.addEventListener("click", () => closeNavbar(true));

navLinks.forEach(link => {
  link.addEventListener("click", () => closeNavbar());
});

// SCROLL ON WINDOW
window.addEventListener("scroll", () => {
  header.classList.toggle("active", window.scrollY > 0)
  skipLink.blur();
  setActiveLink();

  if (navbar.classList.contains("active")) {
    closeNavbar();
  }
})

// Listener for media query changes
mediaQuery.addEventListener("change", updateNavbarVisibility);
updateNavbarVisibility();

// ACTIVE LINK
function setActiveLink() {
  let index = sections.length;

  while (--index && window.scrollY + 50 < sections[index].offsetTop) { }

  navLinks.forEach((link) => link.classList.remove('active'));
  if (index > 0) {
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === '#' + sections[index].id) {
        link.classList.add('active');
      }
    });
  }
}

// SCROLL TO SECTION
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const sectionId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      // Smooth scroll to the target section
      targetSection.scrollIntoView({ behavior: 'smooth' });

      // For the screen reader
      let liveRegion = document.getElementById('live-region');
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.classList.add('aria-live-region-hidden');
        document.body.appendChild(liveRegion);
      }

      // Announce the full content of the section
      setTimeout(() => {
        liveRegion.textContent = targetSection.textContent;
      }, 400);
    }
  });
});