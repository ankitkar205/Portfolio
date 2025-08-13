'use strict';

/**
 * This script handles all interactive functionality for the portfolio website:
 * 1. Page Navigation: Switches between About, Resume, Portfolio, and Contact pages.
 * 2. Theme Toggling: Switches between light and dark themes.
 * 3. Animated Background: Creates a radial gradient that follows the mouse cursor.
 */

// -------------------------------------------------------------------
// 1. PAGE NAVIGATION
// -------------------------------------------------------------------

// Select all navigation links and all the pages
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add a click event listener to each navigation link
navLinks.forEach(link => {
  link.addEventListener("click", function () {

    // Get the name of the page to navigate to from the link's `data-nav-link` attribute
    const pageName = this.dataset.navLink;

    // First, remove the 'active' class from all navigation links and pages
    navLinks.forEach(navLink => navLink.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));

    // Then, add the 'active' class to the link that was clicked
    this.classList.add("active");

    // Find the corresponding page using its `data-page` attribute and add the 'active' class to show it
    const targetPage = document.querySelector(`[data-page="${pageName}"]`);
    if (targetPage) {
      targetPage.classList.add("active");
    }

    // Scroll the window to the top for a smooth page transition effect
    window.scrollTo(0, 0);

  });
});

// -------------------------------------------------------------------
// 2. THEME TOGGLING
// -------------------------------------------------------------------

// Select the theme toggle button
const themeBtn = document.querySelector("[data-theme-btn]");

// Add a click event listener to the theme button
themeBtn.addEventListener("click", function () {
  
  // Get the current theme from the `data-theme` attribute on the <html> element
  const currentTheme = document.documentElement.dataset.theme || "dark";
  
  // Determine the new theme by toggling the current one
  const newTheme = currentTheme === "light" ? "dark" : "light";
  
  // Set the `data-theme` attribute on the <html> element to the new theme
  // The CSS will automatically apply the new styles.
  document.documentElement.setAttribute("data-theme", newTheme);

});

// -------------------------------------------------------------------
// 3. ANIMATED BACKGROUND EFFECT
// -------------------------------------------------------------------

// Select the background element
const background = document.querySelector(".background-animation");

// Add a 'mousemove' event listener to the entire window
window.addEventListener("mousemove", function (event) {
  
  // Calculate the mouse's X and Y position as a percentage of the window's total width and height
  const xPosition = (event.clientX / window.innerWidth) * 100;
  const yPosition = (event.clientY / window.innerHeight) * 100;
  
  // Update the CSS custom properties '--x' and '--y' on the background element.
  // The CSS uses these variables to position the radial gradient in real-time.
  if (background) {
    background.style.setProperty("--x", `${xPosition}%`);
    background.style.setProperty("--y", `${yPosition}%`);
  }

});
