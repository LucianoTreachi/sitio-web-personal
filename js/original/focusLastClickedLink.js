// Iterate over all <a> elements 
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    // Save the href attribute in sessionStorage when a link is clicked
    sessionStorage.setItem('lastClickedLink', link.getAttribute('href'));
  });
});

// When the page is loaded, check for the last clicked link
window.addEventListener('load', () => {
  // Retrieve the last clicked link's href from sessionStorage
  const lastClickedLink = sessionStorage.getItem('lastClickedLink');

  if (lastClickedLink) {
    // Find the link using the stored href value
    const linkToFocus = document.querySelector(`a[href="${lastClickedLink}"]`);

    if (linkToFocus) {
      // Restore focus to the link
      linkToFocus.focus();
    }

    // Clear sessionStorage after restoring the focus
    sessionStorage.removeItem('lastClickedLink');
  }
});