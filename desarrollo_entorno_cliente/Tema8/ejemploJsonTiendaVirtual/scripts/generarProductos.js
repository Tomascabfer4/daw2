
const vectorProductos=[
  {"imagen": "imagenes/imagen1.jpg", "nombre": "Balón", "descripcion": "De cuero estupendo"},
  {"imagen": "imagenes/imagen2.jpg", "nombre": "Raqueta", "descripcion": "Raqueta genial"},
  {"imagen": "imagenes/imagen3.jpg", "nombre": "Botas", "descripcion": "Botas de fútbol"},
  {"imagen": "imagenes/imagen3.jpg", "nombre": "Botas", "descripcion": "Botas de fútbol"},
  {"imagen": "imagenes/imagen3.jpg", "nombre": "Botas", "descripcion": "Botas de fútbol"},
  {"imagen": "imagenes/imagen3.jpg", "nombre": "Botas", "descripcion": "Botas de fútbol"}
];

const botonMostrar=document.getElementById("mostrar");
botonMostrar.addEventListener("click",()=>{
     cargarProductos();
});
const contenedorCentral=document.getElementById("contenedorCentral");
const cargarProductos=()=>{
  const contenedorProducto=document.createElement("div");
  const imagenProducto=document.createElement("img");
  const nombreProducto=document.createElement("h2");
  const descripcionProducto=document.createElement("h3");

  contenedorProducto.className="bloque-producto";

  contenedorProducto.appendChild(imagenProducto);
  contenedorProducto.appendChild(nombreProducto);
  contenedorProducto.appendChild(descripcionProducto);

  //recorro el vector principal donde cada elemento es un documento json, realmente es un mapa
  vectorProductos.forEach(producto=>{
    const nuevoProducto=contenedorProducto.cloneNode(true);
    nuevoProducto.children[0].src=producto.imagen;
    nuevoProducto.children[1].innerText=producto.nombre;
    nuevoProducto.children[2].innerText=producto.descripcion;
    contenedorCentral.appendChild(nuevoProducto);
  });
}





