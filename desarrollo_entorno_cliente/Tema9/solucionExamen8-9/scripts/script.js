//función para obtener los datos desde el JSON
async function obtenerDatosFichero(ruta)
{
    try {
        const response = await fetch(ruta);
        if (!response.ok) 
          throw new Error(`Error en el response`);
        const datos = await response.json();
        
        return datos;    
        } 
        catch (error) {
        console.error(error);
        }
}



//obtenemos los enlaces y les asociamos un evento
const cargarAlumnos=document.getElementById("cargarAlumnos");
const estadisticaPorAlumno=document.getElementById("estadisticaPorAlumno");
const estadisticaGeneral=document.getElementById("estadisticaGeneral");
const parteDerecha=document.getElementById("parteDerecha");
const parteIzquierda=document.getElementById("parteIzquierda");

//generamos el contenedor de gráficos 
const nuevoCanvas=document.createElement("canvas");
//la variable del gráfico
let grafico;


//los eventos
cargarAlumnos.addEventListener("click",(e)=>{
    e.preventDefault();
    modificarParteCentral("opcion1");
});

estadisticaPorAlumno.addEventListener("click",(e)=>{
    e.preventDefault();
    modificarParteCentral("opcion2");
});

estadisticaGeneral.addEventListener("click",(e)=>{
    e.preventDefault();
    modificarParteCentral("opcion3");
});

//funcion que modidifca la parte central de la página según lo que hayamos seleccionado
async function modificarParteCentral(opcion)
{
    //eliminamos el contenido de las dos partes
    parteIzquierda.innerHTML="";
    parteDerecha.innerHTML="";
    
    //según la opcion
    switch(opcion)
    {
        case "opcion1":
            mostrarImagenes();
        break;
        case "opcion2":
            graficoPorAlumno();
        break;
        case "opcion3":
            graficoDeNotasMedias();
    }

}

//función para mostrar las imágenes
async function mostrarImagenes()
{
    
    //obtenemos los datos desde el fichero
    const datos= await obtenerDatosFichero("alumnos.json");
    
    //recorremos los datos y por cada json, sacamos la ruta de la imagen y la añadimos 
    //al div de la parte izquierda
   
    datos.forEach(dato =>{
        const imagen=document.createElement("img");
        imagen.src="./imagenes/"+dato.imagen;
        imagen.classList.add="imagen";
        imagen.addEventListener("click",(e)=>{
            mostrarDatosDelAlumno(dato);
        });
        parteIzquierda.appendChild(imagen);
    });

}

//muestra los datos en la parte derecha cuando se pulsa encima de una imagen
function mostrarDatosDelAlumno(dato)
{
    parteDerecha.innerHTML="";
    const nombre=document.createElement('h1');
    nombre.textContent=dato.nombre;
    const curso=document.createElement('h3');
    curso.textContent=dato.curso;
    const dwecTexto=document.createElement('h3');
    dwecTexto.textContent="Nota DWEC";
    const dwec=document.createElement('h3');
    dwec.textContent=dato.dwec;
    const dwesTexto=document.createElement('h3');
    dwesTexto.textContent="Nota DWES";
    const dwes=document.createElement('h3');
    dwes.textContent=dato.dwes;
    const diTexto=document.createElement('h3');
    diTexto.textContent="Nota DI";
    const di=document.createElement('h3');
    di.textContent=dato.di;
    parteDerecha.appendChild(nombre);
    parteDerecha.appendChild(curso);
    parteDerecha.appendChild(dwecTexto);
    parteDerecha.appendChild(dwec);
    parteDerecha.appendChild(dwesTexto);
    parteDerecha.appendChild(dwes);
    parteDerecha.appendChild(diTexto);
    parteDerecha.appendChild(di);
}

async function graficoPorAlumno() {
     
    //obtenemos los datos desde el fichero
    const datos= await obtenerDatosFichero("alumnos.json");
    //generamos el select
    const selector=document.createElement("select");
    //agregamos el grafico y generamos el ctx
    const ctx=nuevoCanvas.getContext("2d");
    //agregamos el selector y el grafico a contenedor en su parte izquierda
    parteIzquierda.appendChild(selector);
    parteIzquierda.appendChild(nuevoCanvas);
    
    datos.forEach((dato,indice)=>{
        const nuevoOption=document.createElement("option");
        nuevoOption.textContent=dato.nombre;
        nuevoOption.value=indice;
        selector.appendChild(nuevoOption);
        selector.addEventListener("change",()=>
        generarGrafico(dato, ctx));
    });
    
   //como estará seleccionado el primer elemento del selector
   generarGrafico(datos[0],ctx);
}

function generarGrafico(dato,ctx)
{
    if (grafico) {
        grafico.clear();
        grafico.destroy();
    }
  
    grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Nota DWEC', 'Nota DWES', 'Nota DI'],
            datasets: [{
                label: 'Notas de '+dato.nombre,
                data: [dato.dwec, dato.dwes, dato.di],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });
    grafico.update();
   
    
    
}

async function graficoDeNotasMedias()
{
    //obtenemos los datos desde el fichero
    const datos= await obtenerDatosFichero("alumnos.json");
    const nombres=datos.map(dato=>dato.nombre);
    const medias=datos.map(dato=>(dato.dwec+dato.dwes+dato.di)/3);
    //añadimos el grafio
    parteIzquierda.appendChild(nuevoCanvas);
    
    if (grafico) {
        grafico.clear();
        grafico.destroy();
    }
    const ctx=nuevoCanvas.getContext("2d");
    
    grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [{
                label: 'Notas de medias',
                data: medias,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });
    grafico.update();
}

 /**/