$(document).ready(function(){
    $(window).scroll(function(){
        // Sticky navbar on scroll script
        if($(this).scrollTop() > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        
        // Scroll-up button show/hide script
        if($(this).scrollTop() > 500){
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Scroll-up button click event
    $('.scroll-up-btn').click(function(){
        $('html, body').animate({scrollTop: 0}, 'slow');
        // Removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    // Apply smooth scroll on menu items click
    $('.navbar .menu li a').click(function(){
        $('html').css("scrollBehavior", "smooth");
    });

    // Toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    //send msg
    function send() {
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "ankitkarcab205@gmail.com",
            Password: "3BD3AEB99A74A0FF94505B9EC6EF835D5821",
            To: 'rikkar627@gmail.com',
            From: 'rikkar627@gmail.com',
            Subject: document.querySelector(".field input[type='text']").value,
            Body: "Name: " + document.querySelector(".field.name input").value +
                "<br> Email: " + document.querySelector(".field.email input").value +
                "<br> Message: " + document.querySelector(".field.textarea textarea").value
        }).then(
            message => alert("Message sent successfully!")
        ).catch(
            error => alert("Failed to send message. Error: " + error)
        );
    }
    
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        send(); // Call the send function
        this.reset(); // Reset the form fields
    });

    // Typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Student", "Designer", "Guitarist", "Developer", "Editor"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Student", "Designer", "Guitarist", "Developer", "Editor"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });

    
});
