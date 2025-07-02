// Join button logic
const btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "https://forms.gle/3d1b7a5f8c9z4Z2h6";
});

// Scroll animation logic
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
    reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
    } else {
        el.classList.remove("active");
    }
    });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
navLinks.classList.toggle("active");
});