let listadoAlumnos = [];
const enlaceCargarAlumnos = document.getElementById("cargar-alumnos");
const enlaceEstadisticaAlumno = document.getElementById("estadistica-alumno");
const enlaceEstadisticaGeneral = document.getElementById("estadistica-general");
const contenedorGlobal = document.getElementById("contenedor-global");
const informacionAlumno = document.createElement("div");
informacionAlumno.classList.add("informacion-alumno");
let grafico;

// Funcion asincrona que devuelve un vector con la informacion de la API.
const leerJson = async () => {
  try {
    const response = await fetch("alumnos.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error cargando el JSON:", error);
    return [];
  }
};

const mostrarAlumnos = (alumnos) => {
  contenedorGlobal.innerHTML = "";
  const cuadriculaFotos = document.createElement("div");
  cuadriculaFotos.classList.add("cuadricula-fotos");
  alumnos.forEach((alumno) => {
    const tarjetaFoto = document.createElement("div");
    tarjetaFoto.classList.add("tarjeta-foto");
    const marcoFoto = document.createElement("div");
    marcoFoto.classList.add("marco-foto");
    const imagen = document.createElement("img");
    imagen.src = "./imagenes/" + alumno.imagen;
    imagen.alt = alumno.nombre;
    marcoFoto.appendChild(imagen);
    tarjetaFoto.appendChild(marcoFoto);

    tarjetaFoto.addEventListener("click", () => {
      mostrarInformacionAlumno(alumno);
    });

    cuadriculaFotos.appendChild(tarjetaFoto);
  });
  contenedorGlobal.appendChild(cuadriculaFotos);
};

const mostrarInformacionAlumno = (alumno) => {
  informacionAlumno.innerHTML = "";
  const nombre = document.createElement("h1");
  nombre.innerText = alumno.nombre;
  informacionAlumno.appendChild(nombre);
  const curso = document.createElement("h2");
  curso.innerText = alumno.curso;
  informacionAlumno.appendChild(curso);
  const resumenGeneral = document.createElement("h3");
  resumenGeneral.innerText = "Resumen General";
  informacionAlumno.appendChild(resumenGeneral);
  const notaDWEC = document.createElement("p");
  notaDWEC.innerText = "Nota DWEC: " + alumno.dwec;
  informacionAlumno.appendChild(notaDWEC);
  const notaDWES = document.createElement("p");
  notaDWES.innerText = "Nota DWES: " + alumno.dwes;
  informacionAlumno.appendChild(notaDWES);
  contenedorGlobal.appendChild(informacionAlumno);
};

const mostrarEstadisticaPorAlumno = (alumnos) => {
  contenedorGlobal.innerHTML = "";
  const labelSelect = document.createElement("label");
  labelSelect.innerText = "Selecciona un alumno";
  contenedorGlobal.appendChild(labelSelect);
  const select = document.createElement("select");
  select.id = "select-alumnos";

  alumnos.forEach((alumno) => {
    const option = document.createElement("option");
    option.value = alumno.nombre;
    option.innerText = alumno.nombre;
    select.appendChild(option);

    select.addEventListener("change", () => {
      const nombreAlumno = select.value;
      const alumno = alumnos.find((alumno) => alumno.nombre === nombreAlumno);
      mostrarGraficoAlumno(alumno);
    });
  });
  contenedorGlobal.appendChild(select);
  mostrarGrafico(alumnos[0]);
};

const mostrarGrafico = (alumno) => {
  const canvas = document.createElement("canvas");
  canvas.id = "grafico";
  contenedorGlobal.appendChild(canvas);
  const ctx = document.getElementById("grafico").getContext("2d");
  const modulos = ["DWEC", "DWES", "DI"];

  const coloresDeFondo = [];
  const coloresDeBorde = [];
  modulos.forEach(() => {
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
      labels: modulos,
      datasets: [
        {
          label: "Notas de " + alumno.nombre,
          data: [alumno.dwec, alumno.dwes, alumno.di],
          backgroundColor: coloresDeFondo,
          borderColor: coloresDeBorde,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Puntuación por Modulo",
        },
      },
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

const mostrarEstadisticasGeneral = (alumnos) => {
  contenedorGlobal.innerHTML = "";
  const canvas = document.createElement("canvas");
  canvas.id = "grafico";
  contenedorGlobal.appendChild(canvas);
  const ctx = document.getElementById("grafico").getContext("2d");
  const nombreAlumnos = alumnos.map((alumno) => alumno.nombre);
  const notasMedia = alumnos.map(
    (alumno) => (alumno.dwec + alumno.dwes + alumno.di) / 3
  );

  const coloresDeFondo = [];
  const coloresDeBorde = [];
  nombreAlumnos.forEach(() => {
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
      labels: nombreAlumnos,
      datasets: [
        {
          label: "Nota Media de los Alumnos",
          data: notasMedia,
          backgroundColor: coloresDeFondo,
          borderColor: coloresDeBorde,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Nota Media de los Alumnos",
        },
      },
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

// Creamos la funcion asincrona para llamar a cada unas de las funciones de la app.
const iniciarApp = async () => {
  listadoAlumnos = await leerJson();
  mostrarAlumnos(listadoAlumnos);
  enlaceCargarAlumnos.addEventListener("click", () => {
    mostrarAlumnos(listadoAlumnos);
  });
  enlaceEstadisticaAlumno.addEventListener("click", () => {
    mostrarEstadisticaPorAlumno(listadoAlumnos);
  });
  enlaceEstadisticaGeneral.addEventListener("click", () => {
    mostrarEstadisticasGeneral(listadoAlumnos);
  });
};

iniciarApp();
