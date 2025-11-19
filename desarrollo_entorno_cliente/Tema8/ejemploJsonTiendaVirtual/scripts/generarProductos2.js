
const vectorProductos=[
  {
    "imagen": "imagenes/imagen1.jpg", 
    "nombre": "Balón", 
    "caracteristicas":{
                        "precio":20, 
                        "modelo":"Modelo1"
                      } 
  },
  {"imagen": "imagenes/imagen2.jpg", "nombre": "Raqueta", "caracteristicas":{"precio":15,"modelo":"Modelo antiguo"}  },
  {"imagen": "imagenes/imagen3.jpg", "nombre": "Botas", "caracteristicas": {
                        "precio":10, 
                        "modelo":"Nuevo"
                      } }
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
  const precioProducto=document.createElement("h3");
  const modeloProducto=document.createElement("h3");

  contenedorProducto.className="bloque-producto";

  contenedorProducto.appendChild(imagenProducto);
  contenedorProducto.appendChild(nombreProducto);
  contenedorProducto.appendChild(precioProducto);
   contenedorProducto.appendChild(modeloProducto);

  //recorro el vector principal donde cada elemento es un documento json, realmente es un mapa
  vectorProductos.forEach(producto=>{
    const nuevoProducto=contenedorProducto.cloneNode(true);
    nuevoProducto.children[0].src=producto.imagen;
    nuevoProducto.children[1].innerText=producto.nombre;
    nuevoProducto.children[2].innerText=producto.caracteristicas.precio;
    nuevoProducto.children[3].innerText=producto.caracteristicas.modelo;
    contenedorCentral.appendChild(nuevoProducto);
  });
}





