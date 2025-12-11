// Estado del carrito
let carrito = [];

// Elementos del DOM
const contadorCarrito = document.getElementById("contadorCarrito");
const carritoVacio = document.getElementById("carritoVacio");
const carritoLleno = document.getElementById("carritoLleno");
const itemsCarrito = document.getElementById("itemsCarrito");
const precioTotal = document.getElementById("precioTotal");
const fondoModal = document.getElementById("fondoModal");
const itemsModal = document.getElementById("itemsModal");
const precioTotalModal = document.getElementById("precioTotalModal");
const botonConfirmar = document.getElementById("botonConfirmar");
const botonNuevoPedido = document.getElementById("botonNuevoPedido");

// Inicializar eventos
document.addEventListener("DOMContentLoaded", () => {
  // Añadir eventos a los botones "Agregar al carrito"
  document.querySelectorAll(".botonAgregar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const receta = e.target.closest(".receta");
      agregarAlCarrito(receta);
    });
  });

  // Añadir eventos a los botones de incremento/decremento
  document.querySelectorAll(".botonIncrementar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const receta = e.target.closest(".receta");
      actualizarCantidad(receta, 1);
    });
  });

  document.querySelectorAll(".botonDecrementar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const receta = e.target.closest(".receta");
      actualizarCantidad(receta, -1);
    });
  });

  // Confirmar pedido
  botonConfirmar.addEventListener("click", () => {
    mostrarModal();
  });

  // Iniciar nuevo pedido
  botonNuevoPedido.addEventListener("click", () => {
    reiniciarCarrito();
  });
});

// Añadir producto al carrito
function agregarAlCarrito(receta) {
  const nombre = receta.dataset.nombre;
  const precio = parseFloat(receta.dataset.precio);
  const imagen = receta.dataset.imagen;

  // Verificar si ya existe en el carrito
  const itemExistente = carrito.find((item) => item.nombre === nombre);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }

  // Marcar receta como seleccionada
  receta.classList.add("seleccionado");
  receta.querySelector(".cantidad").textContent = itemExistente
    ? itemExistente.cantidad
    : 1;

  actualizarUICarrito();
}

// Actualizar cantidad
function actualizarCantidad(receta, cambio) {
  const nombre = receta.dataset.nombre;
  const item = carrito.find((item) => item.nombre === nombre);

  if (item) {
    item.cantidad += cambio;

    if (item.cantidad <= 0) {
      // Eliminar del carrito
      carrito = carrito.filter((i) => i.nombre !== nombre);
      receta.classList.remove("seleccionado");
      receta.querySelector(".cantidad").textContent = 1;
    } else {
      receta.querySelector(".cantidad").textContent = item.cantidad;
    }

    actualizarUICarrito();
  }
}

// Eliminar item del carrito
function eliminarDelCarrito(nombre) {
  carrito = carrito.filter((item) => item.nombre !== nombre);

  // Quitar clase seleccionado de la receta correspondiente
  document.querySelectorAll(".receta").forEach((receta) => {
    if (receta.dataset.nombre === nombre) {
      receta.classList.remove("seleccionado");
      receta.querySelector(".cantidad").textContent = 1;
    }
  });

  actualizarUICarrito();
}

// Actualizar UI del carrito
function actualizarUICarrito() {
  const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const totalPrecio = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  contadorCarrito.textContent = totalItems;

  if (carrito.length === 0) {
    carritoVacio.style.display = "flex";
    carritoLleno.style.display = "none";
  } else {
    carritoVacio.style.display = "none";
    carritoLleno.style.display = "block";

    // Renderizar items del carrito
    itemsCarrito.innerHTML = carrito
      .map(
        (item) => `
      <div class="itemCarrito">
        <div class="infoItemCarrito">
          <h4>${item.nombre}</h4>
          <div class="detallesItem">
            <span class="cantidadItem">${item.cantidad}x</span>
            <span class="precioItem">@ $${item.precio.toFixed(2)}</span>
            <span class="totalItem">$${(item.precio * item.cantidad).toFixed(
              2
            )}</span>
          </div>
        </div>
        <button class="botonEliminar" onclick="eliminarDelCarrito('${
          item.nombre
        }')">
          <img src="./assets/images/icon-remove-item.svg" alt="eliminar" />
        </button>
      </div>
    `
      )
      .join("");

    precioTotal.textContent = `$${totalPrecio.toFixed(2)}`;
  }
}

// Mostrar modal de confirmación
function mostrarModal() {
  const totalPrecio = carrito.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  itemsModal.innerHTML = carrito
    .map(
      (item) => `
    <div class="itemModal">
      <img src="${item.imagen}" alt="${item.nombre}" />
      <div class="infoItemModal">
        <h4>${item.nombre}</h4>
        <div class="detallesItemModal">
          <span class="cantidadItemModal">${item.cantidad}x</span>
          <span class="precioItemModal">@ $${item.precio.toFixed(2)}</span>
        </div>
      </div>
      <span class="totalItemModal">$${(item.precio * item.cantidad).toFixed(
        2
      )}</span>
    </div>
  `
    )
    .join("");

  precioTotalModal.textContent = `$${totalPrecio.toFixed(2)}`;
  fondoModal.classList.add("activo");
}

// Reiniciar carrito
function reiniciarCarrito() {
  carrito = [];

  // Quitar clase seleccionado de todas las recetas
  document.querySelectorAll(".receta").forEach((receta) => {
    receta.classList.remove("seleccionado");
    receta.querySelector(".cantidad").textContent = 1;
  });

  fondoModal.classList.remove("activo");
  actualizarUICarrito();
}
