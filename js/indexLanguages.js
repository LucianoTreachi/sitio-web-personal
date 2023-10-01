import { indexTranslations } from './indexTranslations.js';

// Function to change the language
function changeLanguage(lang) {
  const translationElements = document.querySelectorAll("[data-key]");
  translationElements.forEach(element => {
    const key = element.dataset.key;
    const translation = indexTranslations[lang][key];
    element.innerHTML = translation;
  });

  // Update the language button value
  dropdownButton.innerHTML = lang.toUpperCase() + '<svg class="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path></svg>';

  // Store the selected language in localStorage
  localStorage.setItem("selectedLanguage", lang);
}

// Dropdown
const dropdownButton = document.querySelector(".dropdown-button");
const dropdownMenu = document.querySelector(".dropdown-menu");

// Close the menu when clicked outside
document.addEventListener("click", (event) => {
  if (!dropdownMenu.contains(event.target) && !dropdownButton.contains(event.target)) {
    dropdownMenu.style.display = "none";
  }
});

dropdownButton.addEventListener("click", () => {
  dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

// Get the language stored in localStorage (if it exists)
const storedLanguage = localStorage.getItem("selectedLanguage");

// If there's no language stored in localStorage, use a default language
const initialLanguage = storedLanguage || "es";

const languageLinks = document.querySelectorAll(".dropdown-menu a");
languageLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedLang = event.target.dataset.lang.toLowerCase(); // Get the language from the data-lang attribute
    changeLanguage(selectedLang);
    dropdownMenu.style.display = "none";
    dropdownButton.innerHTML = event.target.innerHTML + '<svg class="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path></svg>';
  });
});

// On page load, set the initial language
changeLanguage(initialLanguage);