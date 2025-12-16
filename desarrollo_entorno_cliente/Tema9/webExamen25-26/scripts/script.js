const titulosNoticias = document.getElementById("titulosNoticias");
const sectionNoticias = document.getElementById("sectionNoticias");
const listaCategorias = document.getElementById("listaCategorias");
const botonPortada = document.getElementById("botonPortada");
const botonCategorias = document.getElementById("botonCategorias");
const botonGraficos = document.getElementById("botonGraficos");
const contenedorMain = document.getElementById("contenedorMain");
let listadoNoticias = [];
let grafico;

// Funcion asincrona que devuelve un vector con la informacion de la API.
const leerJson = async () => {
  try {
    const response = await fetch("noticias.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error cargando el JSON:", error);
    return [];
  }
};

const mostrarTitulosNoticias = (listadoNoticias) => {
  let contador = -1;
  const todasLosTitulos = listadoNoticias.flatMap((noticia) => noticia.titulo);

  intervalo = setInterval(() => {
    contador++;
    titulosNoticias.innerText = todasLosTitulos[contador];
    if (contador >= todasLosTitulos.length - 1) {
      contador = -1;
    }
  }, 2000);
};

const portadaAparecerNoticias = (listadoNoticias) => {
  sectionNoticias.innerHTML = "";
  listadoNoticias.forEach((noticia) => {
    const articuloNoticia = document.createElement("article");
    const tituloNoticia = document.createElement("h2");
    tituloNoticia.innerText = noticia.titulo;
    articuloNoticia.appendChild(tituloNoticia);
    const fechaNoticia = document.createElement("p");
    fechaNoticia.classList.add("meta");
    fechaNoticia.innerText = noticia.fechaPublicacion;
    articuloNoticia.appendChild(fechaNoticia);
    const resumenNoticia = document.createElement("p");
    resumenNoticia.innerText = noticia.resumen;
    articuloNoticia.appendChild(resumenNoticia);
    const brNoticia = document.createElement("br");
    articuloNoticia.appendChild(brNoticia);
    const contenidoNoticia = document.createElement("p");
    contenidoNoticia.innerText = noticia.contenido;
    articuloNoticia.appendChild(contenidoNoticia);
    articuloNoticia.appendChild(brNoticia);
    const autorNoticia = document.createElement("p");
    autorNoticia.innerHTML = "<strong>Autor:</strong> " + noticia.autor;
    articuloNoticia.appendChild(autorNoticia);
    const categoriaNoticia = document.createElement("p");
    categoriaNoticia.innerHTML =
      "<strong>Categoria:</strong> " + noticia.categoria;
    articuloNoticia.appendChild(categoriaNoticia);
    const votosNoticia = document.createElement("p");
    votosNoticia.innerHTML = "<strong>Votos:</strong> " + noticia.votos;
    articuloNoticia.appendChild(votosNoticia);
    const imagenNoticia = document.createElement("img");
    imagenNoticia.src = "/imagenes/" + noticia.imagen;
    articuloNoticia.appendChild(imagenNoticia);
    sectionNoticias.appendChild(articuloNoticia);
  });
};

const aparecerCategorias = (listadoNoticias) => {
  listaCategorias.innerHTML = "";
  const todasLasCategorias = listadoNoticias.flatMap(
    (noticia) => noticia.categoria
  );
  // Realmente esto no hace falta por la estructura del json, pero si tuviese categorias duplicadas, esto hace que no suceda.
  const categoriasUnicas = [...new Set(todasLasCategorias)];
  categoriasUnicas.forEach((categoria) => {
    const liCategoria = document.createElement("li");
    const aLiCategoria = document.createElement("a");
    aLiCategoria.href = "#";
    aLiCategoria.innerText = categoria;
    aLiCategoria.addEventListener("click", () => {
      const seleccion = categoria;
      const noticiasFiltradas = listadoNoticias.filter((noticia) => {
        return noticia.categoria.includes(seleccion);
      });
      portadaAparecerNoticias(noticiasFiltradas);
    });
    liCategoria.appendChild(aLiCategoria);
    listaCategorias.appendChild(liCategoria);
  });
};

const mostrarGraficoNoticias = (listadoNoticias) => {
  const ctx = document.getElementById("grafico").getContext("2d");
  const coloresDeFondo = [];
  const coloresDeBorde = [];
  listadoNoticias.forEach(() => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    coloresDeFondo.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
    coloresDeBorde.push(`rgba(${r}, ${g}, ${b}, 1)`);
  });

  // Si existe el grafico lo eliminamos
  if (grafico) {
    grafico.destroy();
  }

  grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: listadoNoticias.map((noticia) => noticia.id),
      datasets: [
        {
          label: "Votos Noticias",
          data: listadoNoticias.map((noticia) => noticia.votos),
          backgroundColor: coloresDeFondo,
          borderColor: coloresDeBorde,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animations: {
        y: {
          easing: "easeInOutElastic",
          from: (ctx) => {
            if (ctx.type === "data") {
              if (ctx.mode === "default" && !ctx.dropped) {
                ctx.dropped = true;
                return 0;
              }
            }
          },
        },
      },
    },
  });
};

const iniciarApp = async () => {
  listadoNoticias = await leerJson();
  mostrarTitulosNoticias(listadoNoticias);
  botonPortada.addEventListener("click", () => {
    portadaAparecerNoticias(listadoNoticias);
  });
  botonCategorias.addEventListener("click", () => {
    aparecerCategorias(listadoNoticias);
  });
  botonGraficos.addEventListener("click", () => {
    sectionNoticias.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.id = "grafico";
    sectionNoticias.appendChild(canvas);
    mostrarGraficoNoticias(listadoNoticias);
  });
};

iniciarApp();
