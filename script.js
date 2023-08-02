const button1 = document.querySelector(".mobile-toggler");
const menu = document.querySelector(".mobile-navbar");

button1.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
