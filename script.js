document.getElementById("year").textContent = new Date().getFullYear();

// Keep FAQ behavior clean: one item open at a time
const detailsList = Array.from(document.querySelectorAll(".faq details"));
detailsList.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    detailsList.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close the menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Intersection Observer for Scroll Animations
const observeElements = document.querySelectorAll(".reveal-on-scroll");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
}, observerOptions);

observeElements.forEach((el) => {
  observer.observe(el);
});
