const vectorProductos = [
  {
    imagen: "imagenes/imagen1.jpg",
    nombre: "Balón",
    descripcion: "De Cuero Estupendo",
  },
  {
    imagen: "imagenes/imagen1.jpg",
    nombre: "Raqueta",
    descripcion: "Raqueta Genial",
  },
  {
    imagen: "imagenes/imagen1.jpg",
    nombre: "Botas",
    descripcion: "Botas de Futbol",
  },
];

const botonMostrar = document.getElementById("mostrar");
botonMostrar.addEventListener("click", () => {
  cargarProductos();
});

const contenedorCentral = document.getElementById("contenedorCentral");

const cargarProductos = () => {
  const contenedorProducto = document.createElement("div");
  const imagenProducto = document.createElement("img");
  const nombreProducto = document.createElement("h2");
  const descripcionProducto = document.createElement("h3");

  contenedorProducto.className="bloque-producto"

  contenedorProducto.appendChild(imagenProducto);
  contenedorProducto.appendChild(nombreProducto);
  contenedorProducto.appendChild(descripcionProducto);

  //Recorro el vector principal donde cada elemento es un documento json, realmente es un mapa
  vectorProductos.forEach((producto) => { 
    const nuevoProducto = contenedorProducto.cloneNode(true);
    nuevoProducto.children[0].src=producto.imagen;
    nuevoProducto.children[1].innerText=producto.nombre;
    nuevoProducto.children[2].innerText=producto.descripcion;
    contenedorCentral.appendChild(nuevoProducto);
  });


};

// // Es decir, la estructura sería algo así

// // <div class="product">
// //     <img src="https://via.placeholder.com/200" alt="Producto 1">
// //     <div class="product-info">
// //       <h4>Producto 1</h4>
// //       <p>Descripción breve del producto.</p>
// //     </div>
// //     <button>Agregar al carrito</button>
// //   </div>

// // El div principal lo vamos a llamar bloqueProducto
// // El img lo vamos a llamar imagenProducto
// // El div secundario lo vamos a llamar bloqueTextoProducto
// // El h4  lo vamos a llamar h4Producto
// // El p   lo vamos a llamar pProducto
// // El button lo vamos a llamar botonProducto

// const bloqueProducto = document.createElement("div");
// bloqueProducto.classList.add("bloque-producto");

// const imagenProducto = document.createElement("img");
// imagenProducto.setAttribute("src", "imagenes/imagen1.jpg");
// imagenProducto.setAttribute("alt", "Producto");
// bloqueProducto.appendChild(imagenProducto);

// const bloqueTextoProducto = document.createElement("div");
// bloqueTextoProducto.classList.add("bloque-texto-producto");

// const h4Producto = document.createElement("h4");
// h4Producto.textContent = "Balón de cuero";
// bloqueTextoProducto.appendChild(h4Producto);

// const pProducto = document.createElement("p");
// pProducto.textContent = "Descripción del producto";
// bloqueTextoProducto.appendChild(pProducto);
// bloqueProducto.appendChild(bloqueTextoProducto);

// const botonProducto = document.createElement("button");
// botonProducto.textContent = "Agregar al carrito";
// bloqueProducto.appendChild(botonProducto);

// //Ya tenemos nuestro bloque creado, se llama bloqueProducto
// //Implementamos una función que recoja el número de productos que se han selecionado
// //y genere tantos bloques de productos como sean necesarios
// const generarProductos = function () {
//   const contenedor = document.getElementById("contenedor");
//   //obtenemos el valor del listado
//   const numeroDeProductos = document.getElementById("product-count").value;
//   for (i = 0; i < numeroDeProductos; i++) {
//     const copiaProducto = bloqueProducto.cloneNode(true);
//     contenedor.appendChild(copiaProducto);
//   }
// };
