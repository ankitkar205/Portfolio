document.addEventListener('DOMContentLoaded', () => {

    // --- Helper Function for Smooth Scrolling ---
    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return; // Exit if target element doesn't exist

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function (easeInOutQuad) - you can choose others
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('href');
            smoothScroll(targetId, 1000); // Scroll duration: 1000ms (1 second)
        });
    });


    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme(theme) {
        body.classList.toggle('dark-mode', theme === 'dark-mode');
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    themeToggle?.addEventListener('click', () => { // Optional chaining
        const newTheme = body.classList.contains('dark-mode') ? '' : 'dark-mode';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- Tab Functionality (About Me section) ---
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');

    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active classes from all tabs and content
            tabLinks.forEach(tabLink => tabLink.classList.remove('active-link'));
            tabContents.forEach(tabContent => tabContent.classList.remove('active-tab'));

            // Add active classes to the clicked tab and its content
            this.classList.add('active-link');
            document.getElementById(this.dataset.tab).classList.add('active-tab');
        });
    });

    // Set "About" tab as active initially (using optional chaining)
    document.querySelector('.tab-links[data-tab="tab0"]')?.click();


    // --- Service Details Toggle ---
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            if (details) {
                details.style.display = details.style.display === 'none' || details.style.display === '' ? 'block' : 'none';
            }
        });
    });
});
