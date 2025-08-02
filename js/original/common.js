const backLink = document.querySelector(".back-link");

backLink.addEventListener("click", function (e) {
  e.preventDefault();
  window.history.back();
});
