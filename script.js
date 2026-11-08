// Edit these values when your public profile URLs are ready.
const PROFILE_LINKS = {
  github: "https://github.com/Ammarah-ds",
  linkedin: "www.linkedin.com/in/ammarah-khan-92a456447"
};

const projects = [
  { title: "Hospital Management System", description: "Designed a system for managing patient records and hospital appointments using procedural programming concepts. Implemented functions for data entry, retrieval, and report generation with structured data handling.", tags: ["C++", "Procedural Programming", "Data Handling"] },
  { title: "Library Management System", description: "Built a book inventory system to track library books, including titles, authors, and availability status. Developed functions for adding and removing books, searching by category, and generating availability reports.", tags: ["C++", "Inventory", "Search & Retrieval"] },
  { title: "Employee Management System", description: "Built a comprehensive system with three modules: automated employee ID generation using static data members; tax calculation based on salary tiers using encapsulation; and performance-based bonus logic using polymorphism and inheritance.", tags: ["C++", "OOP", "Encapsulation", "Inheritance", "Polymorphism"] },
  { title: "Tic-Tac-Toe Game", description: "Developed an interactive two-player Tic-Tac-Toe game with win detection logic and board validation. Implemented game state management and user input handling with a clean console-based UI.", tags: ["C++", "Game Logic", "Validation"] },
  { title: "Wireless Power Transfer", description: "Developed a wireless charger for power transmission from scratch for an applied physics project.", tags: ["Applied Physics", "Hardware Project"] }
];

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Reveal-on-scroll animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Animated hero role
const roles = ["Aspiring Data Scientist", "C++ Programmer", "Problem Solver"];
const roleText = document.getElementById("roleText");
let roleIndex = 0;
setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  roleText.classList.add("role-changing");
  setTimeout(() => {
    roleText.textContent = roles[roleIndex];
    roleText.classList.remove("role-changing");
  }, 180);
}, 2600);

// Project detail modal
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalClose = document.getElementById("modalClose");
document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => {
    const project = projects[Number(button.dataset.project)];
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTags.replaceChildren(...project.tags.map(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      return span;
    }));
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalClose.focus();
  });
});
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

// Contact form: opens the user's email client with validated and prefilled details.
// For direct submission without an email client, connect Formspree (instructions in README).
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const subject = data.get("subject").trim();
  const message = data.get("message").trim();
  const body = `From: ${name} (${email})\n\n${message}`;
  const mailto = `mailto:khhaann.016@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById("formFeedback").textContent = "Your email app should open with the message prefilled. Please review and send it there.";
  window.location.href = mailto;
});

// Social profile placeholders remain non-fake until URLs are supplied.
document.querySelectorAll("[data-profile]").forEach(link => {
  const platform = link.dataset.profile;
  if (PROFILE_LINKS[platform]) {
    link.href = PROFILE_LINKS[platform];
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.classList.remove("profile-placeholder");
  } else {
    link.addEventListener("click", event => {
      event.preventDefault();
      alert(`Add your ${platform === "github" ? "GitHub" : "LinkedIn"} URL in script.js to activate this link.`);
    });
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
