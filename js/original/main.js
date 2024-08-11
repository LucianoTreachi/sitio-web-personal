// avoid modal contact reload
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

// NAVBAR
const hamburgerButton = document.querySelector(".hamburger-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const overlay = document.querySelector(".overlay");

hamburgerButton.addEventListener('click', () => {
  navbar.classList.add("active")
  overlay.classList.add("active");
});

closeMenuButton.addEventListener('click', () => {
  navbar.classList.remove("active")
  overlay.classList.remove("active");
});

overlay.addEventListener('click', () => {
  navbar.classList.remove("active")
  overlay.classList.remove("active");
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
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

// FAQS
const questions = document.querySelectorAll('.question');

questions.forEach(question => {
  question.addEventListener('click', () => {
    let height = 0;
    let showAnswer = question.nextElementSibling;
    let addPadding = question.parentElement.parentElement;

    addPadding.classList.toggle('add-padding');
    question.children[1].classList.toggle('rotate-arrow');

    if (showAnswer.clientHeight === 0) {
      height = showAnswer.scrollHeight;
    }

    showAnswer.style.height = `${height}px`;
  });
})

// CONTACT
const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const textarea = document.getElementById("textarea");
const textareaCharacters = document.getElementById("textarea-characters");

const alertName = document.getElementById("alert-name");
const alertEmail = document.getElementById("alert-email");
const alertTextarea = document.getElementById("alert-textarea");

const modalContact = document.getElementById("modal-contact");
const modalContactLoader = document.getElementById("modal-contact-loader");
const modalContactSuccess = document.getElementById("modal-contact-success");
const modalContactError = document.getElementById("modal-contact-error");
const closeModalContact = document.querySelectorAll(".close-modal-contact");

/* Regular Expressions */
const expName = /^[\S][A-Za-zÀ-ÿ\s']+$/;
const expEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{4,63}\.){1,125}(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b$/i;
const expMessage = /^[\s\S]{9,500}$/

/* State */
const state = {
  name: false,
  email: false,
  textarea: false
}

/* Validate Regular Expressions */
function validateRegularExpressions(e) {

  const check = e.target.parentElement.querySelector('.check');

  switch (e.target.id) {

    case "input-name":
      if (expName.test(e.target.value)) {
        alertName.classList.remove("active");
        check.classList.add("active");
        state.name = true;
      }
      else {
        alertName.classList.add("active");
        check.classList.remove("active");
        state.name = false;
      }
      break;

    case "input-email":
      if (expEmail.test(e.target.value)) {
        alertEmail.classList.remove("active");
        check.classList.add("active");
        state.email = true;
      }
      else {
        alertEmail.classList.add("active");
        check.classList.remove("active");
        state.email = false;
      }
      break;

    case "textarea":
      if (expMessage.test(e.target.value)) {
        alertTextarea.classList.remove("active");
        check.classList.add("active");
        state.textarea = true;
      }
      else {
        alertTextarea.classList.add("active");
        check.classList.remove("active");
        state.textarea = false;
      }
      break;
  }
}

/* Remove leading spaces and allow one space between each word on the name input  */
inputName.addEventListener("input", () => {
  inputName.value = inputName.value.replace(/^\s+/g, '').replace(/\s+/g, ' ');
});

/* Remove all the white spaces on the email input */
inputEmail.addEventListener("input", () => {
  inputEmail.value = inputEmail.value.trim();
})

/* Remove leading spaces on the textarea */
textarea.addEventListener("input", () => {
  textarea.value = textarea.value.replace(/^\s+/g, '');
});

/* Inputs blur */
inputs.forEach((input) => {
  input.addEventListener('blur', validateRegularExpressions);
});

/* Textarea blur */
textarea.addEventListener('blur', validateRegularExpressions);

/* Textarea character counter */
function characterCounter() {
  const count = textarea.value.length;
  textareaCharacters.innerHTML = `${count}/500`;
}
textarea.addEventListener('input', characterCounter);

/* Submit */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let firstInvalidInput = null;

  if (!state.name) {
    alertName.classList.add('active');
    inputName.focus();
    firstInvalidInput = inputName;
  }

  if (!state.email && !firstInvalidInput) {
    alertEmail.classList.add('active');
    inputEmail.focus();
    firstInvalidInput = inputEmail;
  }

  if (!state.textarea && !firstInvalidInput) {
    alertTextarea.classList.add('active');
    textarea.focus();
    firstInvalidInput = textarea;
  }

  if (firstInvalidInput) {
    const rect = firstInvalidInput.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.scrollY - 100,
      behavior: 'smooth'
    });
    firstInvalidInput.focus();
    return;
  }

  if (state.name && state.email && state.textarea) {

    modalContact.classList.add("active");

    emailjs.sendForm('service_c3wl15o', 'template_jgw4yri', '#form', 'hUS51mu8VJq2dQccV')
      .then(() => {
        setTimeout(() => {
          modalContactLoader.style.display = "none";
          modalContactSuccess.style.display = "block";
          form.reset();
        }, 3000);
      },

        (error) => {
          setTimeout(() => {
            modalContactLoader.style.display = "none";
            modalContactError.style.display = "block";
            form.reset();
          }, 3000);
          console.log(error);
        })
  }
});

/* Close modal contact */
closeModalContact.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.remove("active");
    location.href = "index.html"
  })
})