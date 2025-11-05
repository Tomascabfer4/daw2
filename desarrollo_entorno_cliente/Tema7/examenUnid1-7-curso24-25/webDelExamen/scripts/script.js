// Asignamos clases a diferentes etiquetas para que sea mas facil a la hora de trabajar
const h3Imagenes = document.getElementsByTagName("h3")[0];
h3Imagenes.setAttribute("class", "h3Imagenes");
const h3Formulario = document.getElementsByTagName("h3")[1];
h3Formulario.setAttribute("class", "h3Formulario");
const h3Listado = document.getElementsByTagName("h3")[2];
h3Imagenes.setAttribute("class", "h3Imagenes");
const textoIndicativoPagina = document.getElementsByTagName("p")[0];
const boton1 = document.getElementsByTagName("a")[0];
boton1.setAttribute("class", "boton1");
const boton2 = document.getElementsByTagName("a")[1];
boton1.setAttribute("class", "boton2");
const boton3 = document.getElementsByTagName("a")[2]
boton1.setAttribute("class", "boton3");
textoIndicativoPagina.setAttribute("class", "textoIndicativoPagina");
const section = document.getElementById("inicio");
const menuOpcion = document.getElementsByTagName("aside")[0];
listaBotones = document.getElementsByTagName("ul")[1];

// Cambiamos el Nombre al cargar el script

const h1NombreApellido = document.getElementsByTagName("h1")[0];
h1NombreApellido.textContent = "Bienvenido soy Tomás Cabello Fernández";

// Seccion Imagenes

const rutasImagenes = [
    "imagenes/img1.jpg",
    "imagenes/img2.jpg",
    "imagenes/img3.jpg" 
];

h3Imagenes.addEventListener("click", function () {
  listaBotones.hidden = false;
  const divImagenAnterior = section.querySelector(".img-container");
  if (divImagenAnterior){
    divImagenAnterior.remove();
  }
  const contadorAnterior = menuOpcion.getElementsByTagName("p")[0];
  if (contadorAnterior){
    contadorAnterior.remove();
  }
  textoIndicativoPagina.textContent = "Estamos en la sección Imágenes";
  rutaAleatoria = rutasImagenes[Math.floor(Math.random() * rutasImagenes.length)];  
  const divImagen = document.createElement("div");
  divImagen.setAttribute("class","img-container");
  const imagen = document.createElement("img");
  imagen.setAttribute("src", rutaAleatoria);
  divImagen.appendChild(imagen);
  section.appendChild(divImagen);
  setInterval(() => {
    rutaAleatoria = rutasImagenes[Math.floor(Math.random() * rutasImagenes.length)];  
    imagen.setAttribute("src", rutaAleatoria);
  }, 2000);
  boton1.textContent = "Filtro1";
  boton2.textContent = "Filtro2";
  boton3.textContent = "Filtro3";

  imagen.addEventListener("contextmenu", function (evento){
    evento.preventDefault();
    alert("La opcion no esta disponible");
  });
});

// Seccion Formulario

h3Formulario.addEventListener("click", function () {
  const contadorAnterior = menuOpcion.getElementsByTagName("p")[0];
  if (contadorAnterior){
    contadorAnterior.remove();
  }
  const divImagenAnterior = section.querySelector(".img-container");
  if (divImagenAnterior){
    divImagenAnterior.remove();
  }
  const divFormularioAnterior = section.getElementsByTagName("div")[0];
  if (divImagenAnterior){
    divImagenAnterior.remove();
  }
  listaBotones.hidden = true;
  textoIndicativoPagina.textContent = "Estamos en la sección Formulario";
  const divFormulario = document.createElement("div");
  const etiquetaNombre = document.createElement("label");
  etiquetaNombre.textContent = "Nombre";
  divFormulario.appendChild(etiquetaNombre);
  const inputNombre = document.createElement("input");
  divFormulario.appendChild(inputNombre);
  const etiquetaAsignatura = document.createElement("label");
  etiquetaAsignatura.textContent = "Asignatura";
  divFormulario.appendChild(etiquetaAsignatura);
  const inputAsignatura = document.createElement("input");
  divFormulario.appendChild(inputAsignatura);
  section.appendChild(divFormulario);

  let contador = 0;
  const tiempoEnFormulario = document.createElement("p");
  menuOpcion.appendChild(tiempoEnFormulario);
  setInterval(() => {
    contador++;
    tiempoEnFormulario.textContent = "Llevas " + contador + " segundos en el formulario.";
  }, 1000);
});

//Seccion Listados

h3Listado.addEventListener("click", function () {
  textoIndicativoPagina.textContent = "Estamos en la sección Listados";
});


function limpiarSeccion() {

}