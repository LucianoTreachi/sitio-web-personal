// DOM ELEMENTS
const header = document.querySelector("header");
const sections = document.querySelectorAll('section');
const hamburgerButton = document.querySelector(".hamburger-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const overlay = document.querySelector(".overlay");
const details = document.querySelectorAll('details');

// NAVBAR: Toggle mobile navbar visibility, overlay, and aria-expanded attribute on button and overlay click
hamburgerButton.addEventListener('click', () => {
  navbar.classList.add("active");
  navbar.setAttribute('aria-hidden', 'false');
  overlay.classList.add("active");
  hamburgerButton.setAttribute("aria-expanded", "true");
  navLinks[0].focus();
});

closeMenuButton.addEventListener('click', () => {
  navbar.classList.remove("active");
  navbar.setAttribute('aria-hidden', 'true');
  overlay.classList.remove("active");
  hamburgerButton.setAttribute("aria-expanded", "false");
  hamburgerButton.focus();
});

overlay.addEventListener('click', () => {
  navbar.classList.remove("active");
  navbar.setAttribute('aria-hidden', 'true');
  overlay.classList.remove("active");
  hamburgerButton.setAttribute("aria-expanded", "false");
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove("active");
    navbar.setAttribute('aria-hidden', 'true');
    overlay.classList.remove("active");
    hamburgerButton.setAttribute("aria-expanded", "false");
  });

  link.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      link.click();
    }
  });
});

window.addEventListener("scroll", () => {
  navbar.classList.remove('active');
  navbar.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('active');
  hamburgerButton.setAttribute("aria-expanded", "false");
})

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

// SCROLL TO SECTION: Smooth scroll to target section on link click or Enter key press
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
    }
  });

  link.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const sectionId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(sectionId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
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