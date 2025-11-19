
/*De manera síncrona, no se pueden usar los datos fuera del fetch
Por seguridad un navegador no puede acceder a archivos internos del equipo
Aquí funciona porque tenemos un servidor virtual como es Open Live Server*/

let vectorProductos;
fetch('json/respuesta.json')
  .then(response => response.json())
  .then(data => {
    //data, tiene los datos ya parseados, es decir, es un array de mapas
    vectorProductos=data;
  })
  .catch(error => console.error("Error:", error));

/* de forma asíncrona
podemos usar los datos fuera del fetch*/
async function cargarJSON() {
  try {
    const response = await fetch('json/respuesta.json');
    const data = await response.json();

    return data; 
  } catch (error) {
    console.error(error);
  }
}
cargarJSON().then(datos=>{
  vectorProductos=datos;
});

const otraFormaFuncionAsincrona= async ()=>{

  try {
    const response = await fetch('json/respuesta.json');
    const data = await response.json();

    return data; 
  } catch (error) {
    console.error(error);
  }
}



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





