// NAVBAR
const hamburgerButton = document.querySelector(".hamburger-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const overlay = document.querySelector(".overlay");

hamburgerButton.addEventListener('click', () => {
  navbar.classList.add("active")
  overlay.classList.add("active");
  hamburgerButton.setAttribute("aria-expanded", "true");
});

closeMenuButton.addEventListener('click', () => {
  navbar.classList.remove("active")
  overlay.classList.remove("active");
  hamburgerButton.setAttribute("aria-expanded", "false");
});

overlay.addEventListener('click', () => {
  navbar.classList.remove("active")
  overlay.classList.remove("active");
  hamburgerButton.setAttribute("aria-expanded", "false");
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove("active");
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
  overlay.classList.remove('active');
  hamburgerButton.setAttribute("aria-expanded", "false");
})

// HEADER ACTIVE
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("active", window.scrollY > 0)
})

// ACTIVE LINK
const sections = document.querySelectorAll('section')

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

// SCROLL TO SECTION
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