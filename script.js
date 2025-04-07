// script.js

// 1. Welcome Alert
window.addEventListener("load", () => {
    alert("Welcome to Foodie Crush! 🍕🍹 Enjoy your food journey!");
});

// 2. Scroll to top button logic (triggered by a key for now)
document.addEventListener("keydown", (e) => {
    if (e.key === "t" || e.key === "T") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

// 3. Update footer with current year dynamically
window.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".footer h1");
    if (footer) {
        footer.innerHTML = `&copy; ${new Date().getFullYear()} Foodie Food. All rights reserved.`;
    }
});

// 4. Highlight navbar item when section is in view
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});
const banners = [
    "back.jpeg",
    "backgg.jpeg",
    "menu.jpeg",
    "image.jpeg",
    "manu.jpeg",
    "meenu.jpeg"
];
let index = Math.floor(Math.random() * banners.length);

document.addEventListener("DOMContentLoaded", function () {
    const bannerImage = document.getElementById("bannerImage");
    if (bannerImage) {
        bannerImage.src = banners[index];

        setInterval(() => {
            index = (index + 1) % banners.length;
            bannerImage.src = banners[index];
        }, 10000); // Rotate every 10 seconds
    }
});
 
