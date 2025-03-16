document.addEventListener("DOMContentLoaded", () => {
    // --- Helper Function for Smooth Scrolling ---
    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll("nav a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute("href"), 800);
        });
    });

    // --- Theme Toggle ---
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    function applyTheme(theme) {
        body.classList.toggle("dark-mode", theme === "dark-mode");
    }

    // Load saved theme from local storage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) applyTheme(savedTheme);

    themeToggle?.addEventListener("click", () => {
        const newTheme = body.classList.contains("dark-mode") ? "" : "dark-mode";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });

    // --- Tab Functionality (For "About Me" Section) ---
    const tabLinks = document.querySelectorAll(".tab-links");
    const tabContents = document.querySelectorAll(".tab-contents");

    tabLinks.forEach(link => {
        link.addEventListener("click", function () {
            tabLinks.forEach(tabLink => tabLink.classList.remove("active-link"));
            tabContents.forEach(tabContent => tabContent.classList.remove("active-tab"));

            this.classList.add("active-link");
            document.getElementById(this.dataset.tab)?.classList.add("active-tab");
        });
    });

    // Set "About" tab as active initially
    document.querySelector(".tab-links[data-tab='tab0']")?.click();

    // --- Service Details Toggle ---
    document.querySelectorAll(".details-btn").forEach(button => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling;
            if (details) {
                details.style.display = (details.style.display === "none" || details.style.display === "") ? "block" : "none";
                button.textContent = details.style.display === "block" ? "Hide Details" : "Show Details"; // Toggle button text
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle?.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});
