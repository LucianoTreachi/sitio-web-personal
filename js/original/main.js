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

// SKIP TO MAIN CONTENT: Prevent default action, focus on the main title, and manage Escape key interaction 
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

// NAVBAR: Toggle mobile navbar visibility, overlay, aria attributes and focus
function openNavbar() {
  navbar.classList.add("active");
  overlay.classList.add("active");
  openMenuButton.setAttribute("aria-expanded", "true");
  openMenuButton.setAttribute("aria-hidden", "true");
  closeMenuButton.focus();
}

function closeNavbarWithFocus() {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");
  openMenuButton.setAttribute("aria-hidden", "false");
  openMenuButton.focus();
}

function closeNavbar() {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  openMenuButton.setAttribute("aria-expanded", "false");
  openMenuButton.setAttribute("aria-hidden", "false");
}

openMenuButton.addEventListener('click', openNavbar);
closeMenuButton.addEventListener('click', closeNavbarWithFocus);
overlay.addEventListener('click', closeNavbarWithFocus);

navLinks.forEach(link => {
  link.addEventListener('click', closeNavbar);
});

// SCROLL: Toggle 'active' class on the header, blur the skip link, highlight active link, and close navbar if open
window.addEventListener("scroll", () => {
  header.classList.toggle("active", window.scrollY > 0)
  skipLink.blur();
  setActiveLink();

  if (navbar.classList.contains("active")) {
    closeNavbar();
  }
})

// ACTIVE LINK: Highlight the current section's link in the navbar based on scroll position
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

// SCROLL TO SECTION: Smooth scroll to target section on link click and Announce the section title
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const sectionId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // For the screen reader
      let liveRegion = document.getElementById('live-region');
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('style', 'position: absolute; left: -9999px;');
        document.body.appendChild(liveRegion);
      }

      // Announce the section title
      setTimeout(() => {
        liveRegion.textContent = targetSection.querySelector('.section-title').textContent;
      }, 100);
    }
  });
});