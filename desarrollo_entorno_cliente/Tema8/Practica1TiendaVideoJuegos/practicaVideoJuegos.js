let listadoVideojuegos = [];

const leerJson = async () => {
  try {
    const response = await fetch('videojuegos.json');
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error cargando el JSON:", error);
    return [];
  }
}


const contenedorCentral = document.getElementById("contenedorCentral");

const cargarVideojuegos = async() => {
  const cardVideojuego = document.createElement("div");
  cardVideojuego.className = "card-videojuego";
  const imagenVideojuego = document.createElement("img");
  cardVideojuego.appendChild(imagenVideojuego);
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
  const precioMoneda = document.createElement("p");
  infoVideojuego.appendChild(precioMoneda);
  const precioValor = document.createElement("p");
  infoVideojuego.appendChild(precioValor);
  const valoracionVideojuego = document.createElement("p");
  infoVideojuego.appendChild(valoracionVideojuego);
  cardVideojuego.appendChild(infoVideojuego);

  listadoVideojuegos = await leerJson();

  listadoVideojuegos.forEach((videojuego) => {
    const nuevoVideojuego = cardVideojuego.cloneNode(true);
    nuevoVideojuego.children[0].src = videojuego.imagen;
    nuevoVideojuego.children[1].children[0].innerText = videojuego.titulo;
    nuevoVideojuego.children[1].children[1].innerText = videojuego.genero;
    nuevoVideojuego.children[1].children[2].innerText = videojuego.plataformas;
    nuevoVideojuego.children[1].children[3].innerText = videojuego.desarrollador.nombre;
    nuevoVideojuego.children[1].children[4].innerText = videojuego.desarrollador.pais;
    nuevoVideojuego.children[1].children[5].innerText = videojuego.desarrollador.fundacion;
    nuevoVideojuego.children[1].children[6].innerText = videojuego.lanzamiento.fecha;
    nuevoVideojuego.children[1].children[7].innerText = videojuego.lanzamiento.publicado_por;
    nuevoVideojuego.children[1].children[8].innerText = videojuego.clasificacion_edad;
    if (videojuego.modo_de_juego.singleplayer) {
      nuevoVideojuego.children[1].children[9].innerText = "Singleplayer";
    }
    if (videojuego.modo_de_juego.multiplayer) {
      nuevoVideojuego.children[1].children[10].innerText = "Multiplayer";
    }
    nuevoVideojuego.children[1].children[11].innerText = videojuego.precio.moneda;
    nuevoVideojuego.children[1].children[12].innerText = videojuego.precio.valor;
    nuevoVideojuego.children[1].children[13].innerText = videojuego.valoracion;
    contenedorCentral.appendChild(nuevoVideojuego);
  });

}

cargarVideojuegos();

