let listadoVideojuegos = [];
const contenedorCentral = document.getElementById("contenedorCentral");
const selectPlataformas = document.getElementById("plataformas");
const buscar = document.getElementById("buscar");
const botonOrdenar = document.getElementById("botonOrdenar");

const cardVideojuegoModelo = document.createElement("div");
cardVideojuegoModelo.className = "card-videojuego";
const imagenVideojuego = document.createElement("img");
cardVideojuegoModelo.appendChild(imagenVideojuego);
const infoVideojuego = document.createElement("div");
infoVideojuego.className = "card-info";
const tituloVideojuego = document.createElement("h2");
infoVideojuego.appendChild(tituloVideojuego);
const generoVideojuego = document.createElement("p");
infoVideojuego.appendChild(generoVideojuego);
const plataformasVideojuego = document.createElement("span");
plataformasVideojuego.className = "plataformas";
infoVideojuego.appendChild(plataformasVideojuego);
const desarrolladorNombre = document.createElement("p");
infoVideojuego.appendChild(desarrolladorNombre);
const desarrolladorPais = document.createElement("p");
infoVideojuego.appendChild(desarrolladorPais);
const desarrolladorFundacion = document.createElement("p");
infoVideojuego.appendChild(desarrolladorFundacion);
const lanzamientoFecha = document.createElement("p");
infoVideojuego.appendChild(lanzamientoFecha);
const lanzamientoPublicadoPor = document.createElement("p");
infoVideojuego.appendChild(lanzamientoPublicadoPor);
const clasificacionEdadVideojuego = document.createElement("p");
infoVideojuego.appendChild(clasificacionEdadVideojuego);
const modoDeJuegoSinglePlayer = document.createElement("p");
infoVideojuego.appendChild(modoDeJuegoSinglePlayer);
const modoDeJuegoMultiplayer = document.createElement("p");
infoVideojuego.appendChild(modoDeJuegoMultiplayer);
const precioValor = document.createElement("p");
infoVideojuego.appendChild(precioValor);
const valoracionVideojuego = document.createElement("p");
infoVideojuego.appendChild(valoracionVideojuego);
cardVideojuegoModelo.appendChild(infoVideojuego);

const leerJson = async () => {
  try {
    const response = await fetch("videojuegos.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error cargando el JSON:", error);
    return [];
  }
};

const mostrarVideojuegos = (juegosParaMostrar) => {
  contenedorCentral.innerHTML = "";
  juegosParaMostrar.forEach((videojuego) => {
    const nuevoVideojuego = cardVideojuegoModelo.cloneNode(true);
    nuevoVideojuego.children[0].src = videojuego.imagen;
    const info = nuevoVideojuego.children[1];
    info.children[0].innerText = videojuego.titulo;
    info.children[1].innerText = videojuego.genero;
    nuevoVideojuego.children[1].children[2].innerText = videojuego.plataformas;
    info.children[3].innerHTML = `<strong>Desarrollador:</strong> ${videojuego.desarrollador.nombre}`;
    info.children[4].innerHTML = `<strong>Pais del Desarrollador:</strong> ${videojuego.desarrollador.pais}`;
    info.children[5].innerHTML = `<strong>Fundación:</strong> ${videojuego.desarrollador.fundacion}`;
    info.children[6].innerHTML = `<strong>Lanzamiento:</strong> ${videojuego.lanzamiento.fecha}`;
    info.children[7].innerHTML = `<strong>Distribuidora:</strong> ${videojuego.lanzamiento.publicado_por}`;
    info.children[8].innerHTML = `<strong>Edad:</strong> ${videojuego.clasificacion_edad}`;

    if (videojuego.modo_de_juego.singleplayer) {
      nuevoVideojuego.children[1].children[9].innerHTML =
        "<strong>Modo</strong> Singleplayer";
    }
    if (videojuego.modo_de_juego.multiplayer) {
      nuevoVideojuego.children[1].children[10].innerHTML =
        "<strong>Modo</strong> Multiplayer";
    }
    info.children[11].innerHTML = `<strong>Precio:</strong> ${videojuego.precio.valor} ${videojuego.precio.moneda}`;
    info.children[12].innerHTML = `<strong>Valoración:</strong> ${videojuego.valoracion_media}`;
    contenedorCentral.appendChild(nuevoVideojuego);
  });
};

const cargarSelect = () => {
  const todasLasPlataformas = listadoVideojuegos.flatMap(
    (juego) => juego.plataformas
  );
  // Hacemos el set para que no existan duplicados de plataformas
  const plataformasUnicas = [...new Set(todasLasPlataformas)];
  const optionTodas = document.createElement("option");
  optionTodas.value = "todas";
  optionTodas.innerText = "Todas las plataformas";
  selectPlataformas.appendChild(optionTodas);

  plataformasUnicas.forEach((plataforma) => {
    const option = document.createElement("option");
    option.value = plataforma;
    option.innerText = plataforma;
    selectPlataformas.appendChild(option);
  });

  selectPlataformas.addEventListener("change", (evento) => {
    const seleccion = evento.target.value;
    if (seleccion === "todas") {
      mostrarVideojuegos(listadoVideojuegos);
    } else {
      const juegosFiltrados = listadoVideojuegos.filter((juego) => {
        return juego.plataformas.includes(seleccion);
      });
      mostrarVideojuegos(juegosFiltrados);
    }
  });
};

const busqueda = () => {
  buscar.addEventListener("change", (evento) => {
    const buscado = evento.target.value;
    const juegoBuscado = listadoVideojuegos.filter((juego) => {
      const tituloEnMinusculas = juego.titulo.toLowerCase();
      return tituloEnMinusculas.includes(buscado.toLowerCase());
    });
    mostrarVideojuegos(juegoBuscado);
  });
};

const ordenar = () => {
  botonOrdenar.addEventListener("click", () => {
    const juegosOrdenados = [...listadoVideojuegos].sort((a, b) => {
      return a.precio.valor - b.precio.valor;
    });
    mostrarVideojuegos(juegosOrdenados);
  });
};

const iniciarApp = async () => {
  listadoVideojuegos = await leerJson();
  mostrarVideojuegos(listadoVideojuegos);
  cargarSelect();
  busqueda();
  ordenar();
};

iniciarApp();
