// Initialize Particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
        },
        opacity: { value: 0.5, anim: { enable: false } },
        size: { value: 5, random: true, anim: { enable: false } },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 4, // Reduced speed for a smoother effect
            direction: "none",
            out_mode: "out",
            bounce: false,
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
        },
        modes: {
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
        },
    },
    retina_detect: true,
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Ensures the section aligns well with the viewport
        });
    });
});

// Tab switching functionality
const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

tabLinks.forEach((tab) => {
    tab.addEventListener("click", function () {
        // Clear active states from all tabs and contents
        tabLinks.forEach(link => link.classList.remove("active-link"));
        tabContents.forEach(content => content.classList.remove("active-tab"));

        // Activate selected tab and content
        this.classList.add("active-link");
        document.getElementById(this.dataset.tab).classList.add("active-tab");
    });
});
