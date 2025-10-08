const indexTranslations = {
  es: {
    /* Skip link */
    skipLink: "Ir al contenido principal",

    /* Nav */
    navLink1: "Sobre mí",
    navLink2: "Soluciones",
    navLink3: "Proyectos",
    navLink4: "Contacto",

    /* Home */
    heroTitle: "Desarrollo Sitios Web Optimizados y Accesibles",
    heroSubtitle: "Puedo crear soluciones web eficientes, intuitivas y fáciles de usar.",

    /* About */
    aboutTitle: "Soy Luciano Treachi",
    aboutParagraph: "Desarrollador Frontend enfocado en optimización y accesibilidad web. Me dedico a crear soluciones web eficientes, accesibles, intuitivas y fáciles de usar que potencian la experiencia del usuario.",
    aboutPhrase: '"Un diseño estratégico y un desarrollo eficiente pueden marcar una gran diferencia en la conversión y la satisfacción del usuario".',

    /* Solutions */
    servicesTitle: "Así puedo ayudar",
    serviceTitle1: "Desarrollo Web",
    serviceTitle2: "Optimización Web",
    serviceTitle3: "Accesibilidad Web",
    serviceParagraph1: "Puedo desarrollar sitios web optimizados y adaptados a cualquier dispositivo.",
    serviceParagraph2: "Puedo optimizar sitios web para mejorar significativamente su velocidad y rendimiento.",
    serviceParagraph3: "Puedo adaptar sitios web para que sean accesibles para todos los usuarios.",

    /* Projects */
    projectsTitle: "Alguno de mis proyectos",
    moreProjectsBtn: "Ver más proyectos",

    /* Methodology */
    methodologyTitle: "Mi Metodología de Trabajo",
    methodology1Heading: "¿Cuáles son las mejores prácticas que aplico para el Desarrollo Web?",
    methodology2Heading: "¿Cómo optimizo un sitio web?",
    methodology3Heading: "¿Cómo garantizo la Accesibilidad Web?",
    methodologyText: "Conocer más",

    /* Contact */
    contactTitle: "Contacto",
    contactParagraph: "Sería muy interesante hablar sobre cómo podríamos trabajar juntos. Puedes encontrarme en LinkedIn o GitHub.",
  },

  en: {
    /* Skip link */
    skipLink: "Skip to main content",

    /* Nav */
    navLink1: "About me",
    navLink2: "Solutions",
    navLink3: "Projects",
    navLink4: "Contact",

    /* Home */
    heroTitle: "I build optimized and accessible websites",
    heroSubtitle: "I can create efficient, intuitive, and user-friendly web solutions.",

    /* About */
    aboutTitle: "I'm Luciano Treachi",
    aboutParagraph: "Frontend Developer focused on web optimization and accessibility. I specialize in creating efficient, accessible, intuitive, and user-friendly web solutions that enhance the user experience.",
    aboutPhrase: '"Strategic design and efficient development can make a significant difference in conversion rates and user satisfaction."',

    /* Solutions */
    servicesTitle: "How I Can Help",
    serviceTitle1: "Web Development",
    serviceTitle2: "Web Optimization",
    serviceTitle3: "Web Accessibility",
    serviceParagraph1: "I can develop optimized websites adapted to any device.",
    serviceParagraph2: "I can optimize websites to significantly improve their speed and performance.",
    serviceParagraph3: "I can adapt websites to make them accessible to all users.",

    /* Projects */
    projectsTitle: "Some of My Projects",
    moreProjectsBtn: "View more projects",

    /* Methodology */
    methodologyTitle: "My Work Methodology",
    methodology1Heading: "What are the best practices I apply for Web Development?",
    methodology2Heading: "How do I optimize a website?",
    methodology3Heading: "How do I ensure Web Accessibility?",
    methodologyText: "Learn more",

    /* Contact */
    contactTitle: "Contact",
    contactParagraph: "It would be very interesting to talk about how we could work together. You can find me on LinkedIn or GitHub.",
  },

  pt: {
    /* Skip link */
    skipLink: "Ir para o conteúdo principal",

    /* Nav */
    navLink1: "Sobre mim",
    navLink2: "Soluções",
    navLink3: "Projetos",
    navLink4: "Contato",

    /* Home */
    heroTitle: "Desenvolvo sites otimizados e acessíveis",
    heroSubtitle: "Posso criar soluções web eficientes, intuitivas e fáceis de usar.",

    /* About */
    aboutTitle: "Eu sou Luciano Treachi",
    aboutParagraph: "Desenvolvedor Frontend focado em otimização e acessibilidade web. Dedico-me a criar soluções web eficientes, acessíveis, intuitivas e fáceis de usar que potencializam a experiência do usuário.",
    aboutPhrase: '"Um design estratégico e um desenvolvimento eficiente podem fazer uma grande diferença na conversão e na satisfação do usuário."',

    /* Solutions */
    servicesTitle: "Como Posso Ajudar",
    serviceTitle1: "Desenvolvimento Web",
    serviceTitle2: "Otimização de Sites",
    serviceTitle3: "Acessibilidade Web",
    serviceParagraph1: "Posso desenvolver sites otimizados e adaptados para qualquer dispositivo.",
    serviceParagraph2: "Posso otimizar sites para melhorar significativamente sua velocidade e desempenho.",
    serviceParagraph3: "Posso adaptar sites para torná-los acessíveis a todos os usuários.",

    /* Projects */
    projectsTitle: "Alguns dos Meus Projetos",
    moreProjectsBtn: "Ver mais projetos",

    /* Methodology */
    methodologyTitle: "Minha Metodologia de Trabalho",
    methodology1Heading: "Quais são as melhores práticas que aplico para o Desenvolvimento Web?",
    methodology2Heading: "Como otimizo um site?",
    methodology3Heading: "Como garanto a Acessibilidade Web?",
    methodologyText: "Saiba mais",

    /* Contact */
    contactTitle: "Contato",
    contactParagraph: "Seria muito interessante conversar sobre como poderíamos trabalhar juntos. Você pode me encontrar no LinkedIn ou GitHub.",
  }
};

// Function to change the language
function changeLanguage(lang) {
  const translationElements = document.querySelectorAll("[data-key]");
  translationElements.forEach(element => {
    const key = element.dataset.key;
    const translation = indexTranslations[lang][key];
    element.innerHTML = translation;
  });

  // Store the selected language in localStorage
  localStorage.setItem("selectedLanguage", lang);

  // Set the <html lang="..."> attribute dynamically
  document.documentElement.lang = lang;
}

// Language button
const languageButton = document.querySelector(".language-button");
const languageMenu = document.querySelector(".language-menu");
const menuLanguageButtons = Array.from(languageMenu.querySelectorAll("button"));

// Open the language menu when clicking the button
languageButton.addEventListener("click", () => {
  const isExpanded = languageButton.getAttribute("aria-expanded") === "true";

  if (isExpanded) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Allow the "Esc" Key for close the menu
languageButton.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Close the language menu when clicked outside
document.addEventListener("click", (event) => {
  if (!languageMenu.contains(event.target) && !languageButton.contains(event.target)) {
    closeMenu();
  }
});

// Close the language menu when scrolling
window.addEventListener("scroll", closeMenu);

// Open Menu
function openMenu() {
  languageButton.setAttribute("aria-expanded", "true");
  languageMenu.classList.add("active");
}

// Close Menu
function closeMenu() {
  languageButton.setAttribute("aria-expanded", "false");
  languageMenu.classList.remove("active");
}

// Menu language button
menuLanguageButtons.forEach((button, index) => {
  // Keyboard navigation
  button.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      menuLanguageButtons[(index + 1) % menuLanguageButtons.length].focus();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      menuLanguageButtons[(index - 1 + menuLanguageButtons.length) % menuLanguageButtons.length].focus();
    }
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Each menu language button change the language and close the menu
  button.addEventListener("click", (event) => {
    const selectedLang = event.target.getAttribute("data-lang");
    changeLanguage(selectedLang);
    closeMenu();
  });
});

// Get the language stored in localStorage (if it exists)
const storedLanguage = localStorage.getItem("selectedLanguage");

// If there's no language stored in localStorage, use a default language
const initialLanguage = storedLanguage || "es";

// On page load, set the initial language
changeLanguage(initialLanguage);
