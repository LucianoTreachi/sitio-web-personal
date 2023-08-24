import { blogsTranslations } from './blogsTranslations.js';

// Function to change the language on blog and projects pages
function changeLanguagePages(lang) {
  const translationElements = document.querySelectorAll("[data-key]");
  translationElements.forEach(element => {
    const key = element.dataset.key;
    const translation = blogsTranslations[lang][key];
    element.innerHTML = translation;
  });

  // Store the selected language in LocalStorage
  localStorage.setItem("selectedLanguage", lang);
}

// Get the language stored in LocalStorage (if it exists)
const storedLanguage = localStorage.getItem("selectedLanguage");

// If there's no language stored in LocalStorage, use a default language
const initialLanguage = storedLanguage || "es";
changeLanguagePages(initialLanguage); // Change the language when the page loads