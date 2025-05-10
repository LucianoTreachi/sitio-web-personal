const select = document.querySelector(".select");
const projectsList = document.querySelector(".projects-list");
const allProjects = Array.from(document.querySelectorAll(".project"));

// // Filter and display projects based on the selected category
function filterProjects(category) {
  projectsList.innerHTML = "";

  const filtered = category === "all"
    ? allProjects
    : allProjects.filter(p => p.dataset.category === category);

  filtered.forEach(p => projectsList.appendChild(p));
}

// Listen for changes in the select element to filter projects
select.addEventListener("change", (e) => {
  filterProjects(e.target.value);
});

// Handle the back/forward navigation to reset the filter
window.addEventListener("pageshow", function (event) {
  if (event.persisted || (window.performance && window.performance.getEntriesByType("navigation")[0]?.type === "back_forward")) {
    select.value = "all";
    filterProjects("all");
  }
});