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
    homeTitle: "Desarrollo Sitios y Aplicaciones Web",
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
    serviceParagraph1: "Puedo desarrollar sitios web optimizados y adaptados a cualquier dispositivo, mejorando la experiencia en línea.",
    serviceParagraph2: "Puedo optimizar sitios web para mejorar significativamente su velocidad, rendimiento y posicionamiento en buscadores.",
    serviceParagraph3: "Puedo adaptar sitios web para que sean accesibles, mejorando la experiencia de usuarios con diversas necesidades.",

    /* Projects */
    projectsTitle: "Alguno de mis proyectos",
    moreProjectsBtn: "Ver más proyectos",

    /* Methodology */
    methodologyTitle: "Mi Metodología de Trabajo",
    article1: "¿Cuáles son las mejores prácticas que aplico para el Desarrollo Web?",
    article2: "¿Cómo optimizo un sitio web?",
    article3: "¿Cómo garantizo la Accesibilidad Web?",
    articleButton: "Conocer más",

    /* Contact */
    contactTitle: "Contacto",
    contactParagraph: "Sería muy interesante hablar sobre cómo podríamos trabajar juntos. Puedes contactarme por Email, WhatsApp o LinkedIn.",
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
    homeTitle: "I Develop Websites and Web Applications",
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
    serviceParagraph1: "I can develop optimized websites that are adaptable to any device, enhancing the online experience.",
    serviceParagraph2: "I can optimize websites to significantly improve their speed, performance, and search engine ranking.",
    serviceParagraph3: "I can adapt websites to be accessible, enhancing the user experience for individuals with diverse needs.",

    /* Projects */
    projectsTitle: "Some of My Projects",
    moreProjectsBtn: "View more projects",

    /* Methodology */
    methodologyTitle: "My Work Methodology",
    article1: "What are the best practices I apply for Web Development?",
    article2: "How do I optimize a website?",
    article3: "How do I ensure Web Accessibility?",
    articleButton: "Learn more",

    /* Contact */
    contactTitle: "Contact",
    contactParagraph: "It would be very interesting to discuss how we work together. You can reach me through Email, WhatsApp, or LinkedIn.",
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
    homeTitle: "Desenvolvo Sites e Aplicações Web",
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
    serviceParagraph1: "Posso desenvolver sites otimizados e adaptados a qualquer dispositivo, melhorando a experiência online.",
    serviceParagraph2: "Posso otimizar sites para melhorar sua velocidade, desempenho e posicionamento nos motores de busca.",
    serviceParagraph3: "Posso adaptar sites para torná-los acessíveis, melhorando a experiência do usuário com diversas necessidades.",

    /* Projects */
    projectsTitle: "Alguns dos Meus Projetos",
    moreProjectsBtn: "Ver mais projetos",

    /* Methodology */
    methodologyTitle: "Minha Metodologia de Trabalho",
    article1: "Quais são as melhores práticas que aplico para o Desenvolvimento Web?",
    article2: "Como otimizo um site?",
    article3: "Como garanto a Acessibilidade Web?",
    articleButton: "Saiba mais",

    /* Contact */
    contactTitle: "Contato",
    contactParagraph: "Seria muito interessante conversar sobre como poderíamos trabalhar juntos. Você pode me contatar por e-mail, WhatsApp ou LinkedIn",
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
