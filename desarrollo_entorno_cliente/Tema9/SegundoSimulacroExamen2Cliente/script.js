const botonCargarAlumnos = document.getElementById("cargar-alumnos");
const botonEstadisticaAlumnos = document.getElementById("estadistica-alumno");
const botonEstadisticaGeneral = document.getElementById("estadistica-general");
const contenedorGlobal = document.getElementById("contenedor-global");
const informacionAlumno = document.createElement("div");
informacionAlumno.classList.add("informacion-alumno");
let listadoAlumnos;
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

const cargarAlumnos = (alumnos) => {
  contenedorGlobal.innerHTML = "";
  const cuadriculaFotos = document.createElement("div");
  cuadriculaFotos.classList.add("cuadricula-fotos");
  alumnos.forEach((alumno) => {
    const tarjetaFoto = document.createElement("div");
    tarjetaFoto.classList.add("tarjeta-foto");
    const marcoFoto = document.createElement("div");
    marcoFoto.classList.add("marco-foto");
    const imagenAlumno = document.createElement("img");
    imagenAlumno.src = "imagenes/" + alumno.imagen;
    imagenAlumno.alt = alumno.nombre;
    marcoFoto.appendChild(imagenAlumno);
    tarjetaFoto.appendChild(marcoFoto);
    tarjetaFoto.addEventListener("click", () => {
      informacionAlumno.innerHTML = "";
      const nombreAlumno = document.createElement("h1");
      nombreAlumno.innerText = alumno.nombre;
      informacionAlumno.appendChild(nombreAlumno);
      const cursoAlumno = document.createElement("h2");
      cursoAlumno.innerText = alumno.curso;
      informacionAlumno.appendChild(cursoAlumno);
      const resumenGeneral = document.createElement("h3");
      resumenGeneral.innerText = "Resumen General";
      informacionAlumno.appendChild(resumenGeneral);
      const notaDwec = document.createElement("p");
      notaDwec.innerText = "Nota DWEC: " + alumno.dwec;
      informacionAlumno.appendChild(notaDwec);
      const notaDwes = document.createElement("p");
      notaDwes.innerText = "Nota DWES: " + alumno.dwes;
      informacionAlumno.appendChild(notaDwes);
      contenedorGlobal.appendChild(informacionAlumno);
    });
    cuadriculaFotos.appendChild(tarjetaFoto);
  });
  contenedorGlobal.appendChild(cuadriculaFotos);
};

const cargarEstadisticaAlumnos = (alumnos) => {
  contenedorGlobal.innerHTML = "";
  const labelSelect = document.createElement("label");
  labelSelect.innerText = "Seleccionar Alumno";
  const selectNombres = document.createElement("select");
  const nombresAlumnos = alumnos.flatMap((alumno) => alumno.nombre);
  nombresAlumnos.forEach((nombre) => {
    const option = document.createElement("option");
    option.value = nombre;
    option.innerText = nombre;
    selectNombres.appendChild(option);
  });
  contenedorGlobal.appendChild(labelSelect);
  contenedorGlobal.appendChild(selectNombres);
  const canvas = document.createElement("canvas");
  canvas.id = "grafico";
  contenedorGlobal.appendChild(canvas);
  mostrarGraficoAlumno(alumnos[0])
  selectNombres.addEventListener("change", (evento) => {
    const seleccion = evento.target.value;
    const alumnoSeleccionado = alumnos.find((alumno) => {
      return alumno.nombre.includes(seleccion);
    });
    mostrarGraficoAlumno(alumnoSeleccionado);
  });
};

const mostrarGraficoAlumno = (alumno) => {
  const ctx = document.getElementById("grafico").getContext("2d");
  const modulosAlumno = [alumno.dwec, alumno.dwes, alumno.di];
  const coloresDeFondo = [];
  const coloresDeBorde = [];
  modulosAlumno.forEach(() => {
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
      labels: ["DWEC", "DWES", "DI"],
      datasets: [
        {
          label: "Notas de " + alumno.nombre,
          data: modulosAlumno,
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

const cargarEstadisticaGeneral = (alumnos) => {
    contenedorGlobal.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.id = "grafico";
    contenedorGlobal.appendChild(canvas);
    let mediaAlumnos = [];
    let nombreAlumnos = [];
    alumnos.forEach((alumno) => {
        mediaAlumno = (alumno.dwec + alumno.dwes + alumno.di) / 3;
        mediaAlumnos.push(mediaAlumno);
        nombreAlumno = alumno.nombre;
        nombreAlumnos.push(nombreAlumno);
    });
    mostrarGraficoGeneral(mediaAlumnos, nombreAlumnos);
}

const mostrarGraficoGeneral = (notasAlumnos, nombresAlumnos) => {
  const ctx = document.getElementById("grafico").getContext("2d");
  const coloresDeFondo = [];
  const coloresDeBorde = [];
  nombresAlumnos.forEach(() => {
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
      labels: nombresAlumnos,
      datasets: [
        {
          label: "Nota Media",
          data: notasAlumnos,
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
  listadoAlumnos = await leerJson();
  cargarAlumnos(listadoAlumnos);
  botonCargarAlumnos.addEventListener("click", () => {
    cargarAlumnos(listadoAlumnos);
  });
  botonEstadisticaAlumnos.addEventListener("click", () => {
    cargarEstadisticaAlumnos(listadoAlumnos);
  });
  botonEstadisticaGeneral.addEventListener("click", () => {
    cargarEstadisticaGeneral(listadoAlumnos);
  });
};

iniciarApp();
