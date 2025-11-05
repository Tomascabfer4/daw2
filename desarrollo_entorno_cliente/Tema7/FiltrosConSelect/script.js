document.addEventListener("DOMContentLoaded", function () {
  
  // Referencia a la imagen
  const imagen = document.getElementById("imagen-filtrada");

  // Referencia al <select>
  const filtroSelect = document.getElementById("filtro-select");

  // CAMBIO PRINCIPAL:
  // Usamos el evento 'change' en el <select>
  filtroSelect.addEventListener("change", function () {
    
    // Obtenemos el 'value' de la opción seleccionada
    // (Ej: "grayscale(100%)", "sepia(100%)", etc.)
    const filtroAplicar = filtroSelect.value;

    // Aplicamos ese valor directamente al estilo 'filter' de la imagen
    imagen.style.filter = filtroAplicar;
  });
});