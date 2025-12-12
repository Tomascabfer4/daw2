document.addEventListener("DOMContentLoaded", () => {
  const botonesNav = document.querySelectorAll(".btn-nav");

  botonesNav.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evitar cerrar inmediatamente debido al clic en el documento
      const itemNav = btn.parentElement;

      // Cerrar otros menús desplegables abiertos
      document.querySelectorAll(".item-nav.activo").forEach((item) => {
        if (item !== itemNav) {
          item.classList.remove("activo");
        }
      });

      // Alternar menú desplegable actual
      itemNav.classList.toggle("activo");
    });
  });

  // Cerrar menús al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".item-nav")) {
      document.querySelectorAll(".item-nav.activo").forEach((item) => {
        item.classList.remove("activo");
      });
    }
  });
});
