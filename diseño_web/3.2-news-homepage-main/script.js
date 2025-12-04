const menu = document.querySelector(".menu");
const openBtn = document.querySelector(".open-menu");
const closeBtn = document.querySelector(".close-menu");
const body = document.body;

// Abrir menú
openBtn.addEventListener("click", () => {
  menu.classList.add("active");
  body.classList.add("menu-open"); // Para mostrar el overlay oscuro
});

// Cerrar menú
closeBtn.addEventListener("click", () => {
  menu.classList.remove("active");
  body.classList.remove("menu-open");
});
