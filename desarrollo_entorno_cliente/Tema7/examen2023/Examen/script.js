let imagen1 = document.getElementById("imagen1");
let imagen2 = document.getElementById("imagen2");
let imagen3 = document.getElementById("imagen3");
let imagen4 = document.getElementById("imagen4");
let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");
let contenedorBotones = document.getElementById("contenedorBotones");
let lista = document.getElementById("lista");
let parrafo1 = document.getElementById("parrafo1");
let parrafo2 = document.getElementById("parrafo2");
let ultimoBloque = document.getElementById("ultimoBloque");

let cambiarImagen2 = function () {
  setInterval(() => {
    let numeroAleatorio = Math.floor(Math.random() * 3) + 5;
    imagen2.src = "imagenes/imagen" + numeroAleatorio + ".jpg";
  }, 2000);
};

let alternarImagen1Imagen3 = function () {
  boton1.addEventListener("click", function () {
    let acumuladorImagen = imagen1.src;
    imagen1.src = imagen3.src;
    imagen3.src = acumuladorImagen;
  });
};

let añadirElementoaLista = function () {
  boton2.addEventListener("click", function () {
    if (lista.childElementCount >= 6) {
      if (contenedorBotones.childElementCount == 2) {
        let boton3 = document.createElement("button");
        boton3.id = "boton3";
        boton3.classList.add("button");
        boton3.textContent = "Cambiar Estilo";
        contenedorBotones.appendChild(boton3);
        boton3.addEventListener("click", function () {
            lista.className = "list-item2";
        });
      }
    } else {
      let li = document.createElement("li");
      li.classList.add("list-item");
      li.textContent = "Elemento " + (lista.childElementCount + 1);
      lista.appendChild(li);
    }
  });
};

let generarAlertaPrimerParrafo = function () {
  parrafo1.addEventListener("click", function () {
    alert(parrafo1.textContent);
  });
};

let moverImagen4 = function () {
  parrafo2.addEventListener("click", function (){
    ultimoBloque.appendChild(imagen4);
  });
};

moverImagen4();

generarAlertaPrimerParrafo();

añadirElementoaLista();

cambiarImagen2();

alternarImagen1Imagen3();
