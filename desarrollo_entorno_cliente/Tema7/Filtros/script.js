document.addEventListener("DOMContentLoaded", function () {
  // Referencia a la imagen
  const imagen = document.getElementById("imagen-filtrada");

  // Referencias a los botones
  const btnGris = document.getElementById("btn-gris");
  const btnSepia = document.getElementById("btn-sepia");
  const btnInvertir = document.getElementById("btn-invertir");
  const btnOriginal = document.getElementById("btn-original");

  // Eventos de click

  btnGris.addEventListener("click", function () {
    imagen.style.filter = "grayscale(100%)";
  });

  btnSepia.addEventListener("click", function () {
    imagen.style.filter = "sepia(100%)";
  });

  btnInvertir.addEventListener("click", function () {
    imagen.style.filter = "invert(100%)";
  });

  btnOriginal.addEventListener("click", function () {
    // 'none' quita todos los filtros
    imagen.style.filter = "none";
  });
});
