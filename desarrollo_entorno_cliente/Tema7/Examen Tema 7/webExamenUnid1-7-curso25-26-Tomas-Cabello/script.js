const body = document.getElementsByTagName("body")[0];
const titulo = document.getElementById("titulo");
const inicio = document.getElementById("inicio");
const seccionNoticias = document.getElementById("seccionNoticias");
const paginaComoAlPrincipio = seccionNoticias.innerHTML;
const contacto = document.getElementById("contacto");
const ultimaNoticia = document.getElementById("ultimaNoticia");
const todasLasNoticias = document.getElementById("todasLasNoticias");
const carrusel = document.getElementById("carrusel");
const colores = document.getElementById("colores");
const articuloPrincipal = document.getElementById("articuloPrincipal");
const primerParrafoPrimeraNoticia =
  articuloPrincipal.getElementsByTagName("p")[1].textContent;
const primerParrafoSegundaNoticia =
  "SQL es un lenguaje de programacion encargado de hablar con los gestores de base de datos, como por ejemplo MySQL, MariaDB, PostgreSQL... En este lenguaje se procesan operaciones para añadir, obtener, editar, o eliminar campos o tablas de la base de datos. Las tablas sirven para hacer entidades y conectar las mismas para formar una estructura funcional y valida para un modelo de negocio.";
const primerParrafoTerceraNoticia =
  "Normalmente en todos los centros educativos de FP se suele impartir java, esto se debe a que viene especificamente en los resultados de aprendizaje impuestos a los profesores que imparten los modulos. Java es un buen lenguaje para aprender programacion desde cero, porque a dia de hoy hay muchisima documentacion sobre este lenguaje, y cada vez mas.";
const primerParrafoCuartaNoticia =
  "Muchos se preguntan el porque python es uno de los lenguajes mas utilizados a dia de hoy y porque cada vez mas famoso, esto se debe a que python utiliza una sintaxis muy sencilla y facil de aprender, ya que como se suele decir, se lo traga todo, eso quiere decir que no hacen falta puntos y comas y mas detalles que se suelen utilizar en la programacion habitual.";

let cambiarTitulo = function () {
  let contador = 0;
  setInterval(() => {
    contador++;
    switch (contador) {
      case 1:
        titulo.textContent = "Examen DWEC de Tomás Cabello Fernández";
        break;
      case 2:
        titulo.textContent = "Hoy es 12/11/2025";
        break;
      case 3:
        titulo.textContent = "Es mi primer examen";
        contador = 0;
        break;
      default:
        break;
    }
  }, 1000);
};

cambiarTitulo();

inicio.addEventListener("click", function () {
  Limpiar();
  paginaInicioYUltimaNoticia();
});

todasLasNoticias.addEventListener("click", function () {
  Limpiar();
  verTodasLasNoticias();
});

ultimaNoticia.addEventListener("click", function () {
  Limpiar();
  paginaInicioYUltimaNoticia();
});

carrusel.addEventListener("click", function () {
  Limpiar();
  verCarrusel();
});

colores.addEventListener("click", function () {
  Limpiar();
  selectColores();
});

contacto.addEventListener("click", function () {
  Limpiar();
  formularioContacto();
});

let paginaInicioYUltimaNoticia = function () {
  seccionNoticias.innerHTML = paginaComoAlPrincipio;
};

let verTodasLasNoticias = function () {
  let segundaNoticia = document.createElement("article");
  segundaNoticia.className = "noticia";
  segundaNoticia.innerHTML =
    '<h2>Que es y para que se utiliza SQL</h2> <p class="fecha">Publicado el 11 de noviembre de 2025</p><img src="imagenes/imagen1.jpg" alt="Imagen de SQL"></img> ' +
    "<p>" +
    primerParrafoSegundaNoticia +
    "</p>" +
    "<p>Además estas bases datos son obligatorias para que perduren nuestros datos a la hora de utilizar una aplicacion cliente.</p>";
  seccionNoticias.appendChild(segundaNoticia);
  let terceraNoticia = document.createElement("article");
  terceraNoticia.className = "noticia";
  terceraNoticia.innerHTML =
    '<h2>¿Porque se imparte java en la mayoria de centros de educativos de FP?</h2> <p class="fecha">Publicado el 11 de noviembre de 2025</p><img src="imagenes/imagen2.jpg" alt="Imagen de SQL"></img> ' +
    "<p>" +
    primerParrafoTerceraNoticia +
    "</p>" +
    " <p>En este lenguaje se dan cosas, como heredar clases, hacer metodos, y como tratar con objetos.</p>";
  seccionNoticias.appendChild(terceraNoticia);
  let cuartaNoticia = document.createElement("article");
  cuartaNoticia.className = "noticia";
  cuartaNoticia.innerHTML =
    '<h2>Python, el lenguaje de programacion mas simple</h2> <p class="fecha">Publicado el 11 de noviembre de 2025</p><img src="imagenes/imagen3.jpg" alt="Imagen de SQL"></img> ' +
    "<p>" +
    primerParrafoCuartaNoticia +
    "</p>" +
    " <p>Si estas interesado en hacer un curso totalmente gratuito de python y desde 0 consulta el canal de Midudev</p>";
  seccionNoticias.appendChild(cuartaNoticia);
};

let verCarrusel = function () {
  let contadorImagenes = 0;
  let articuloImagenes = document.createElement("article");
  articuloImagenes.className = "noticia";
  let imagen = document.createElement("img");
  imagen.alt = "CARGANDO IMAGEN";
  articuloImagenes.appendChild(imagen);
  seccionNoticias.appendChild(articuloImagenes);
  let parrafoBajoImagen = document.createElement("p");
  articuloImagenes.appendChild(parrafoBajoImagen);
  setInterval(() => {
    contadorImagenes++;
    switch (contadorImagenes) {
      case 1:
        imagen.src = "imagenes/imagenPrincipal.jpg";
        imagen.addEventListener("mouseover", function () {
          parrafoBajoImagen.textContent = primerParrafoPrimeraNoticia;
        });
        break;
      case 2:
        imagen.src = "imagenes/imagen1.jpg";
        imagen.addEventListener("mouseover", function () {
          parrafoBajoImagen.textContent = primerParrafoSegundaNoticia;
        });
        break;
      case 3:
        imagen.src = "imagenes/imagen2.jpg";
        imagen.addEventListener("mouseover", function () {
          parrafoBajoImagen.textContent = primerParrafoTerceraNoticia;
        });
        break;
      case 4:
        imagen.src = "imagenes/imagen3.jpg";
        imagen.addEventListener("mouseover", function () {
          parrafoBajoImagen.textContent = primerParrafoCuartaNoticia;
        });
        contadorImagenes = 0;
        break;
      default:
        break;
    }
    imagen.addEventListener("mouseout", function () {
      parrafoBajoImagen.textContent = "";
    });
  }, 2000);
};

let selectColores = function () {
  let selectColores = document.createElement("select");
  let opcionPorDefecto = document.createElement("option");
  opcionPorDefecto.value = "PorDefecto";
  opcionPorDefecto.textContent = "Por Defecto";
  selectColores.appendChild(opcionPorDefecto);
  let opcionAzul = document.createElement("option");
  opcionAzul.value = "Azul";
  opcionAzul.textContent = "Azul";
  selectColores.appendChild(opcionAzul);
  let opcionVerde = document.createElement("option");
  opcionVerde.value = "Verde";
  opcionVerde.textContent = "Verde";
  selectColores.appendChild(opcionVerde);
  let opcionRojo = document.createElement("option");
  opcionRojo.value = "Rojo";
  opcionRojo.textContent = "Rojo";
  selectColores.appendChild(opcionRojo);
  let opcionAmarillo = document.createElement("option");
  opcionAmarillo.value = "Amarillo";
  opcionAmarillo.textContent = "Amarillo";
  selectColores.appendChild(opcionAmarillo);
  seccionNoticias.appendChild(selectColores);
  let botonSelect = document.createElement("button");
  botonSelect.textContent = "Aplicar";
  seccionNoticias.appendChild(botonSelect);
  botonSelect.addEventListener("click", function () {
    switch (selectColores.value) {
      case "PorDefecto":
        body.style.backgroundColor = "#f8f9fa";
        break;
      case "Azul":
        body.style.backgroundColor = "blue";
        break;
      case "Verde":
        body.style.backgroundColor = "green";
        break;
      case "Rojo":
        body.style.backgroundColor = "red";
        break;
      case "Amarillo":
        body.style.backgroundColor = "yellow";
        break;
      default:
        break;
    }
  });
};

let botonEnviar = document.createElement("button");
botonEnviar.textContent = "Enviar";

let formularioContacto = function () {
  let formulario = document.createElement("form");
  let labelNombre = document.createElement("label");
  labelNombre.textContent = "Nombre";
  formulario.appendChild(labelNombre);
  let inputNombre = document.createElement("input");
  inputNombre.placeholder = "Nombre";
  formulario.appendChild(inputNombre);
  let labelContraseña = document.createElement("label");
  labelContraseña.textContent = "Contraseña";
  formulario.appendChild(labelContraseña);
  let inputContraseña = document.createElement("input");
  inputContraseña.placeholder = "Contraseña";
  formulario.appendChild(inputContraseña);
  let labelTerminos = document.createElement("label");
  labelTerminos.textContent = "Aceptar los Terminos";
  formulario.appendChild(labelTerminos);
  let checkBoxTerminos = document.createElement("input");
  checkBoxTerminos.type = "checkbox";
  formulario.appendChild(checkBoxTerminos);
  seccionNoticias.appendChild(formulario);
  let checkeado = true;
  checkBoxTerminos.addEventListener("click", function () {
    if (checkeado == true) {
      formulario.appendChild(botonEnviar);
      checkeado = false;
    } else {
      botonEnviar.remove();
      checkeado = true;
    }
  });
  let pNombre = document.createElement("p");
  formulario.appendChild(pNombre);
  inputNombre.addEventListener("input", function () {
    pNombre.textContent = inputNombre.value;
  });
  inputContraseña.addEventListener("input", function (e) {
    if (inputContraseña.value.includes("a")){
        alert("Se ha escito la a en contraseña");
    }

  });
};

var Limpiar = function () {
  seccionNoticias.innerHTML = "";
};
