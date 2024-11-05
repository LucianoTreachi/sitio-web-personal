// DOM ELEMENTS
const header = document.querySelector("header");
const hamburgerButton = document.querySelector(".hamburger-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".overlay");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll('section');
const details = document.querySelectorAll('details');

// NAVBAR: Toggle mobile navbar visibility, overlay, aria attributes and focus
function openNavbar() {
  navbar.classList.add("active");
  overlay.classList.add("active");
  hamburgerButton.setAttribute("aria-expanded", "true");
  hamburgerButton.setAttribute("aria-hidden", "true");
  navLinks[0].focus();
}

function closeNavbarWithFocus() {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  hamburgerButton.setAttribute("aria-expanded", "false");
  hamburgerButton.setAttribute("aria-hidden", "false");
  hamburgerButton.focus();
}

function closeNavbar() {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  hamburgerButton.setAttribute("aria-expanded", "false");
  hamburgerButton.setAttribute("aria-hidden", "false");
}

hamburgerButton.addEventListener('click', openNavbar);
closeMenuButton.addEventListener('click', closeNavbarWithFocus);
overlay.addEventListener('click', closeNavbarWithFocus);
window.addEventListener("scroll", closeNavbar)

navLinks.forEach(link => {
  link.addEventListener('click', closeNavbar);
});

// HEADER ACTIVE: Add 'active' class to header on scroll to create a sticky header effect
window.addEventListener("scroll", () => {
  header.classList.toggle("active", window.scrollY > 0)
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

window.addEventListener('scroll', setActiveLink);

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
        liveRegion.textContent = targetSection.querySelector('.title-section').textContent;
      }, 100);
    }
  });
});

// FAQS: Updates aria-expanded for screen readers and sets focus on expanded answer
details.forEach(detail => {
  detail.addEventListener('toggle', function (event) {
    if (event.target.open) {
      const answer = detail.querySelector('.answer');
      if (answer) answer.focus();
    }
  });
});