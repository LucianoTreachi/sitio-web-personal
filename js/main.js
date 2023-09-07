// MENU
const hamburguerMenu = document.querySelector(".hamburguer-menu");
const closeMenu = document.querySelector(".close-menu");
const navbar = document.querySelector("nav .navbar");
const navLinks = document.querySelectorAll(".navbar a");

hamburguerMenu.addEventListener('click', () => {
  navbar.classList.add("active");
});

closeMenu.addEventListener('click', () => {
  navbar.classList.remove("active");
});

navLinks.forEach((e) => {
  e.addEventListener('click', () => {
    navbar.classList.remove("active");
  })
});

// HEADER ACTIVE
window.onscroll = () => {
  navbar.classList.remove('active');

  if (window.scrollY > 0) {
    document.querySelector('header').classList.add('active');
  } else {
    document.querySelector('header').classList.remove('active');
  }
};

window.onload = () => {
  if (window.scrollY > 0) {
    document.querySelector('header').classList.add('active');
  } else {
    document.querySelector('header').classList.remove('active');
  }
};

// SCROLL TO TOP FLOAT WHATSAPP
const whatsappBtn = document.querySelector(".whatsapp-float-btn");

window.addEventListener("scroll", function () {
  whatsappBtn.classList.toggle("active", window.scrollY > 500);
});

// SCROLL TO TOP FLOAT BUTTON
const scrollToTopBtn = document.querySelector(".scrollToTop-float-btn");

window.addEventListener("scroll", function () {
  scrollToTopBtn.classList.toggle("active", window.scrollY > 500);
});

// MODAL CURRICULUM
const curriculumBtn = document.querySelector(".curriculum-btn");
const modalCv = document.getElementById("modal-cv");
const buttonsDownloadCv = document.querySelectorAll(".button-download-cv");
const closeModalCv = document.querySelector(".close-modal-cv");

curriculumBtn.addEventListener("click", () => {
  modalCv.classList.add("active");
})

buttonsDownloadCv.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalCv.classList.remove("active");
    navbar.classList.remove("active");
  })
})

closeModalCv.addEventListener("click", () => {
  modalCv.classList.remove("active");
})

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
const expName = /^[\S][\DÀ-ÿ\s]{1,30}$/;
const expEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{4,63}\.){1,125}(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b$/i;
const expMessage = /^[\S][0-9a-zA-ZÀ-ÿ\s\,.¡!¿?]{9,500}$/;

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

/* Replace white spaces on the input email */
inputEmail.addEventListener("input", () => {
  inputEmail.value = inputEmail.value.replace(/ /g, "");
})

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

/* Function to show the success modal and update history state */
function showModalSuccess() {
  modalContactSuccess.style.display = "block";
  history.pushState({ modalVisible: true }, '', window.location.href);
}

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

    emailjs.sendForm('service_c3wl15o', 'template_jgw4yri', '#form', 'hUS51mu8VJq2dQccV').then(() => {
      setTimeout(() => {
        modalContactLoader.style.display = "none";
        showModalSuccess();
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
    history.pushState({ modalVisible: false }, '', window.location.href);
    location.href = "index.html"
  })
})

/* Event listener for handling the back button press */
window.addEventListener('popstate', function (e) {
  const state = e.state || {};
  if (state.modalVisible) {
    showModalSuccess();
  } else {
    modalContactSuccess.style.display = "none";
  }
});

// Event handler for handling the onpageshow event (for Firefox)
window.onpageshow = function (event) {
  if (event.persisted) {
    // When the page is shown, check if the modal should be displayed
    const state = history.state || {};
    if (state.modalVisible) {
      showModalSuccess();
    }
  }
};