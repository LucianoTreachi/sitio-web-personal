// PROJECT FILTER
const select = document.querySelector(".select");
const projects = document.querySelectorAll(".project");

select.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;

  // Add "hide" class to all projects
  projects.forEach((project) => {
    project.classList.add("hide")
  });

  // Show only the category "All"
  if (selectedCategory === "all") {
    projects.forEach((project) => {
      project.classList.remove("hide")
    });
  }
  // Show the selected category
  else {
    const selectedProjects = document.querySelectorAll(`.project[data-category="${selectedCategory}"]`);
    selectedProjects.forEach((project) => {
      project.classList.remove("hide")
    })
  }
})

window.addEventListener("pageshow", function (event) {
  // Check if we are returning from the individual project page
  if (event.persisted || (window.performance && window.performance.getEntriesByType("navigation")[0]?.type === "back_forward")) {
    // Reset the select value to "All"
    select.value = "all";
  }
});