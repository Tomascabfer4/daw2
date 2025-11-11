//Primero nos traemos los elementos del html que sean necesarios
const mensajeBienvenido = document.getElementById("mensajeBienvenido");
const sectionTitulo = document.getElementById("sectionTitulo");
const mainDinamico = document.getElementById("mainDinamico");
const opcionesDinamico = document.getElementById("opcionesDinamico");
const navGaleria = document.getElementById("navGaleria");
const navPedido = document.getElementById("navPedido");
const navOpiniones = document.getElementById("navOpiniones");

mensajeBienvenido.textContent = "Bienvenido soy Tomás Cabello Fernández";

navGaleria.addEventListener("click", function () {
  Galeria();
});

navPedido.addEventListener("click", function () {
  Pedido();
});
navOpiniones.addEventListener("click", function () {
  Opiniones();
});

let Galeria = function () {
  Limpiar();
  sectionTitulo.textContent = "Estas en la seccion Galeria";
  let numeroAleatorio = Math.floor(Math.random() * 3) + 1;
  let contenedorImagen = document.createElement("div");
  contenedorImagen.classList.add("img-container");
  let imagen = document.createElement("img");
  imagen.src = "imagenes/img" + numeroAleatorio + ".jpg";
  contenedorImagen.appendChild(imagen);
  mainDinamico.appendChild(contenedorImagen);
  setInterval(() => {
    let numeroAleatorioInterval = Math.floor(Math.random() * 3) + 1;
    imagen.src = "imagenes/img" + numeroAleatorioInterval + ".jpg";
  }, 2000);
  contenedorImagen.addEventListener("click", function () {
    opcionesDinamico.innerHTML = "";
    let botonMas = document.createElement("button");
    botonMas.textContent = "+";
    opcionesDinamico.appendChild(botonMas);
    let botonMenos = document.createElement("button");
    botonMenos.textContent = "-";
    opcionesDinamico.appendChild(botonMenos);
  });
  contenedorImagen.addEventListener("contextmenu", function (evento) {
    evento.preventDefault();
    alert("No se puede hacer click con el botón derecho");
  });
};

let Pedido = function () {
  Limpiar();
  sectionTitulo.textContent = "Estas en la seccion Pedido";
  let formulario = document.createElement("form");
  let labelCantidad = document.createElement("label");
  labelCantidad.textContent = "Cantidad";
  formulario.appendChild(labelCantidad);
  let inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.placeholder = "Cantidad";
  formulario.appendChild(inputCantidad);
  let labelTalla = document.createElement("label");
  labelTalla.textContent = "Talla";
  formulario.appendChild(labelTalla);
  let selectTalla = document.createElement("select");
  let opcionS = document.createElement("option");
  opcionS.value = "S";
  opcionS.textContent = "S";
  selectTalla.appendChild(opcionS);
  let opcionM = document.createElement("option");
  opcionM.value = "M";
  opcionM.textContent = "M";
  selectTalla.appendChild(opcionM);
  let opcionL = document.createElement("option");
  opcionL.value = "L";
  opcionL.textContent = "L";
  selectTalla.appendChild(opcionL);
  formulario.appendChild(selectTalla);
  let labelRegalo = document.createElement("label");
  labelRegalo.textContent = "Para Regalo";
  formulario.appendChild(labelRegalo);
  let inputRegalo = document.createElement("input");
  inputRegalo.type = "checkbox";
  formulario.appendChild(inputRegalo);
  mainDinamico.appendChild(formulario);
  let contador = 0;
  let tiempoEnFormulario = document.createElement("h2");
  opcionesDinamico.appendChild(tiempoEnFormulario);
  setInterval(() => {
    contador++;
    tiempoEnFormulario.textContent =
      "¡Oferta válida durante 10 minutos! Tiempo:" + contador + " segundos";
  }, 1000);
  let h3Cantidad = document.createElement("h3");
  opcionesDinamico.appendChild(h3Cantidad);
  inputCantidad.addEventListener("input", function () {
    h3Cantidad.textContent = "Subtotal: " + inputCantidad.value * 15 + "€";
    if (inputCantidad.value == 0) {
      h3Cantidad.textContent = "";
    }
  });
  let h3Select = document.createElement("h3");
  opcionesDinamico.appendChild(h3Select);
  selectTalla.addEventListener("change", function () {
    h3Select.textContent = "Talla seleccionada: " + selectTalla.value;
  });
  let h3Checkbox = document.createElement("h3");
  opcionesDinamico.appendChild(h3Checkbox);
  inputRegalo.addEventListener("mouseover", function () {
    h3Checkbox.textContent = "Coste adicional: 2.99€";
  });
  inputRegalo.addEventListener("mouseout", function () {
    h3Checkbox.textContent = "";
  });
};

let Opiniones = function () {
  Limpiar();
  sectionTitulo.textContent = "Estas en la seccion Opiniones";
  let botonAñadirOpinion = document.createElement("button");
  botonAñadirOpinion.textContent = "Añadir opinión";
  mainDinamico.appendChild(botonAñadirOpinion);
  let botonResetearOpiniones = document.createElement("button");
  botonResetearOpiniones.textContent = "Resetear opiniones";
  mainDinamico.appendChild(botonResetearOpiniones);
  let listaOpiniones = document.createElement("ul");
  mainDinamico.appendChild(listaOpiniones);

  botonAñadirOpinion.addEventListener("click", function () {
    if (listaOpiniones.getElementsByTagName("h4").length >= 4) {
      alert("Limites de opiniones alcanzado.");
    } else {
      let opinionCliente = document.createElement("h4");
      opinionCliente.textContent = "Opinión del cliente";
      listaOpiniones.appendChild(opinionCliente);
      let pOpinionCliente = document.createElement("p");
      pOpinionCliente.textContent = "Lorem Ipsum...";
      listaOpiniones.appendChild(pOpinionCliente);
    }
  });

  botonResetearOpiniones.addEventListener("click", function () {
    listaOpiniones.innerHTML = "";
  });

  let opinionDestacada = document.createElement("h2");
  opinionDestacada.textContent = "Opinion Destacada";
  opcionesDinamico.appendChild(opinionDestacada);
  let pOpinionDestacada = document.createElement("p");
  opcionesDinamico.appendChild(pOpinionDestacada);

  listaOpiniones.addEventListener("click", function (evento) {
    if (evento.target.tagName === "P") {
      pOpinionDestacada.textContent = evento.target.textContent;
    }
  });
};

var Limpiar = function () {
  mainDinamico.innerHTML = "";
  opcionesDinamico.innerHTML = "";
};
