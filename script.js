'use strict';

/**
 * Premium Scrollytelling & Topographical Terrain WebGL
 * 1. Lenis Smooth Scrolling
 * 2. GSAP SplitType & Pro Animations (Clip-Path & Staggers)
 * 3. 3D Hover Tilt for Profile Card
 * 4. Custom Cursor
 * 5. Theme Toggle Logic
 * 6. Three.js Topographical Wave Terrain
 */

let terrainMaterial, threeScene;

document.addEventListener("DOMContentLoaded", () => {
    
    // -------------------------------------------------------------------
    // 1. LENIS SMOOTH SCROLLING
    // -------------------------------------------------------------------
    const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // -------------------------------------------------------------------
    // 2. TEXT SPLITTING & GSAP TIMELINES
    // -------------------------------------------------------------------
    const splitElements = document.querySelectorAll(".split-text");
    const splits = [];

    splitElements.forEach((el) => {
        const split = new SplitType(el, { types: 'lines, words, chars' });
        splits.push(split);
        gsap.set(split.chars, { 
            y: 80, opacity: 0, rotationX: -90, transformOrigin: "0% 50% -50" 
        });
    });

    const preloader = document.querySelector(".preloader");
    const counter = document.querySelector(".counter");
    let progress = { value: 0 };

    gsap.to(progress, {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
            if(counter) counter.innerText = Math.round(progress.value) + "%";
            let pb = document.querySelector(".preloader-progress");
            if(pb) pb.style.width = progress.value + "%";
        },
        onComplete: () => {
            gsap.to(preloader, {
                opacity: 0, duration: 0.8, ease: "power2.inOut",
                onComplete: () => {
                    if(preloader) preloader.style.display = "none";
                    
                    const tl = gsap.timeline();
                    tl.fromTo(".profile-card", 
                        { y: 60, opacity: 0, scale: 0.95 }, 
                        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" }
                    )
                    .fromTo(".top-nav", 
                        { y: -30, opacity: 0 }, 
                        { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.8"
                    )
                    .fromTo("#about", 
                        { y: 40, opacity: 0 }, 
                        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, "-=0.8"
                    );

                    const aboutHeadingSplit = splits.find(s => s.elements[0].classList.contains("article-title") && s.elements[0].closest('#about'));
                    if(aboutHeadingSplit && aboutHeadingSplit.chars) {
                        tl.to(aboutHeadingSplit.chars, {
                            y: 0, opacity: 1, rotationX: 0, stagger: 0.02, duration: 1.2, ease: "expo.out"
                        }, "-=0.8");
                    }
                    
                    const nameSplit = splits.find(s => s.elements[0].classList.contains("name"));
                    if(nameSplit && nameSplit.chars) {
                        tl.to(nameSplit.chars, {
                            y: 0, opacity: 1, rotationX: 0, stagger: 0.02, duration: 1.2, ease: "expo.out"
                        }, "-=1.0");
                    }
                }
            });
        }
    });

    // -------------------------------------------------------------------
    // Animations Inside Each Section (Smooth Entrances)
    // -------------------------------------------------------------------

    const pages = document.querySelectorAll(".page");
    pages.forEach((page, index) => {
        if(index > 0) { 
            gsap.fromTo(page, 
                { opacity: 0, y: 80, scale: 0.98 }, 
                {
                    opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: page, start: "top 90%" }
                }
            );
        }
    });

    splits.forEach(split => {
        if (split.elements[0].closest('#about') && (split.elements[0].classList.contains('article-title') || split.elements[0].classList.contains('name'))) return;

        ScrollTrigger.create({
            trigger: split.elements[0], start: "top 88%",
            onEnter: () => gsap.to(split.chars, { y: 0, opacity: 1, rotationX: 0, stagger: 0.015, duration: 1.2, ease: "expo.out" })
        });
    });

    const paragraphs = document.querySelectorAll(".about-text p, .contact-intro");
    paragraphs.forEach(p => {
        gsap.fromTo(p, 
            { opacity: 0, y: 25 }, 
            {
                opacity: 1, y: 0, duration: 1, ease: "power2.out",
                scrollTrigger: { trigger: p, start: "top 95%" }
            }
        );
    });

    const revealSections = document.querySelectorAll(".timeline-list, .skills, .contact-platform-list, .service-list");
    revealSections.forEach(section => {
        const items = section.querySelectorAll(".reveal-item");
        ScrollTrigger.create({
            trigger: section, start: "top 85%",
            onEnter: () => {
                gsap.fromTo(items, 
                    { opacity: 0, y: 30, rotationX: -15 }, 
                    { opacity: 1, y: 0, rotationX: 0, stagger: 0.1, duration: 1, ease: "power3.out", transformPerspective: 1000 }
                );
            }
        });
    });

    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
        const img = card.querySelector(".project-image img");
        gsap.set(card, { opacity: 0, y: 40 });
        gsap.set(img, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 1.1 });

        ScrollTrigger.create({
            trigger: card, start: "top 85%",
            onEnter: () => {
                const tl = gsap.timeline();
                tl.to(card, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
                  .to(img, { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, duration: 1.4, ease: "expo.out" }, "-=0.5");
            }
        });
    });

    const projectImages = document.querySelectorAll(".project-image img");
    projectImages.forEach(img => {
        gsap.to(img, {
            yPercent: 12, ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: 0.5 }
        });
    });

    const sections = document.querySelectorAll(".page");
    const navLinks = document.querySelectorAll("[data-nav-link]");
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section, start: "top 40%", end: "bottom 40%",
            onEnter: () => updateNav(section.id),
            onEnterBack: () => updateNav(section.id)
        });
    });

    function updateNav(id) {
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            lenis.scrollTo(link.getAttribute("href"), { offset: -50, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        });
    });

    // -------------------------------------------------------------------
    // 3. 3D HOVER TILT FOR PROFILE CARD
    // -------------------------------------------------------------------
    const profileCard = document.querySelector(".profile-card");
    const tiltAmount = 10;

    if(profileCard) {
        profileCard.addEventListener("mousemove", (e) => {
            const rect = profileCard.getBoundingClientRect();
            const xPos = e.clientX - rect.left;
            const yPos = e.clientY - rect.top;
            
            const xRotation = ((yPos - rect.height / 2) / (rect.height / 2)) * -tiltAmount;
            const yRotation = ((xPos - rect.width / 2) / (rect.width / 2)) * tiltAmount;
            
            gsap.to(profileCard, {
                rotationX: xRotation, rotationY: yRotation,
                duration: 0.4, ease: "power2.out", transformPerspective: 1000,
            });
        });

        profileCard.addEventListener("mouseleave", () => {
            gsap.to(profileCard, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        });
    }

    // -------------------------------------------------------------------
    // 4. CUSTOM CURSOR
    // -------------------------------------------------------------------
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        if(cursor) { cursor.style.left = `${mouseX}px`; cursor.style.top = `${mouseY}px`; }
        if(cursorFollower) gsap.to(cursorFollower, { x: mouseX, y: mouseY, duration: 0.3, ease: "power2.out" });
    });

    document.querySelectorAll("a, button, [data-nav-link]").forEach(link => {
        link.addEventListener("mouseenter", () => { 
            if(cursor) cursor.classList.add("hovered"); 
            if(cursorFollower) cursorFollower.classList.add("hovered"); 
        });
        link.addEventListener("mouseleave", () => { 
            if(cursor) cursor.classList.remove("hovered"); 
            if(cursorFollower) cursorFollower.classList.remove("hovered"); 
        });
    });

    // -------------------------------------------------------------------
    // 5. THEME TOGGLE & THREE.JS TERRAIN SYNC
    // -------------------------------------------------------------------
    const themeBtn = document.querySelector("[data-theme-btn]");
    if(themeBtn) {
        themeBtn.addEventListener("click", () => {
            const root = document.documentElement;
            const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", newTheme);

            if (threeScene && terrainMaterial) {
                if (newTheme === "light") {
                    gsap.to(threeScene.fog.color, { r: 0.96, g: 0.96, b: 0.97, duration: 0.8 });
                    gsap.to(terrainMaterial.color, { r: 0.2, g: 0.2, b: 0.25, duration: 0.8 }); 
                } else {
                    gsap.to(threeScene.fog.color, { r: 0.02, g: 0.02, b: 0.03, duration: 0.8 });
                    gsap.to(terrainMaterial.color, { r: 0.23, g: 0.51, b: 0.96, duration: 0.8 });
                }
            }
        });
    }

    // -------------------------------------------------------------------
    // 6. THREE.JS TOPOGRAPHICAL WAVE TERRAIN
    // -------------------------------------------------------------------
    const initThreeJS = () => {
        const canvas = document.querySelector('#webgl-canvas');
        if (!canvas) return;

        threeScene = new THREE.Scene();
        threeScene.fog = new THREE.FogExp2(0x050507, 0.015);
        
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.set(0, 15, 30);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometry = new THREE.PlaneGeometry(100, 100, 40, 40);
        geometry.rotateX(-Math.PI / 2);
        
        const vertices = geometry.attributes.position.array;
        geometry.userData.originalVertices = new Float32Array(vertices.length);
        geometry.userData.originalVertices.set(vertices);

        terrainMaterial = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
        });
        
        const terrainMesh = new THREE.Mesh(geometry, terrainMaterial);
        threeScene.add(terrainMesh);

        let mouseTargetX = 0, mouseTargetY = 0;
        const windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseTargetX = (event.clientX - windowHalfX) * 0.005;
            mouseTargetY = (event.clientY - windowHalfY) * 0.005;
        });

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime() * 0.4;
            
            camera.position.x += (mouseTargetX - camera.position.x) * 0.05;
            camera.position.z += (30 + mouseTargetY - camera.position.z) * 0.05;
            camera.lookAt(0, 5, 0);

            const positions = terrainMesh.geometry.attributes.position.array;
            const originalPositions = terrainMesh.geometry.userData.originalVertices;

            for (let i = 0; i < positions.length; i += 3) {
                const x = originalPositions[i];
                const z = originalPositions[i + 2];
                positions[i + 1] = Math.sin(x * 0.2 + time) * 1.5 + Math.cos(z * 0.2 + time) * 1.5;
            }
            terrainMesh.geometry.attributes.position.needsUpdate = true;
            terrainMesh.rotation.y = time * 0.05;

            renderer.render(threeScene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    if (typeof THREE !== 'undefined') initThreeJS();

}); // End of DOMContentLoaded
