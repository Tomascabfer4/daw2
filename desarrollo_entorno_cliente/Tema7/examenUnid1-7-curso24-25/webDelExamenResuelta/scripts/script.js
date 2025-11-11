//variables globales
let temporizadorImagenes;
var textoRatonEncimaInputNombre;
var primeraVez, primeraVezAsignatura;
var notaSeleccionada;
var valorAsignatura;
var limiteElementos;

//apartado1
var titulo=document.getElementById("nombre");
titulo.textContent="Bienvenido soy Miguel Sánchez";

var panelOpciones=document.getElementById("panelOpciones");
var zonaPrincipal=document.getElementById("zonaPrincipal");
var primeraSeccion=document.getElementById("seccionInicio")
var textoSeccion=document.getElementById("textoSeccion");

//apartado2
var enlaceImagenes=document.getElementById("imagenes");
var enlaceFormulario=document.getElementById("formulario");
var enlaceListado=document.getElementById("listado");

//creo una nueva sección que será modificada según estemos en imágenes, formulario o listado
var nuevaSeccion=document.createElement("section");
zonaPrincipal.appendChild(nuevaSeccion);

//generamos los eventos hacer click en cualquiera de los elementos del menú principal, imágenes, formulario o listado
enlaceImagenes.addEventListener('click', (e) => {
    textoSeccion.textContent="Sección Imágenes";
    Imagenes();
    });

enlaceFormulario.addEventListener('click', (e) => {
        textoSeccion.textContent="Sección Formulario";
        Formulario();
        });

enlaceListado.addEventListener('click', (e) => {
            textoSeccion.textContent="Sección Listado";
            Listado();
        });

//Sección Imágenes


var Imagenes=function()
{
    //borro todo lo que haya en la zona principal y en el panel de opciones
    nuevaSeccion.innerHTML="";
    panelOpciones.innerHTML="";
    //Ejercicio 1
    var numeroAleatorio=Math.floor(Math.random() * 3) + 1;
    var contenedorImagen=document.createElement("div");
    contenedorImagen.classList.add("img-container");
    var imagen=document.createElement("img");
    imagen.src="imagenes/img"+numeroAleatorio+".jpg";
    contenedorImagen.appendChild(imagen);

    nuevaSeccion.appendChild(contenedorImagen);
    //Ejercicio 2, cambiar la imagen cada tres segundos
    temporizadorImagenes=setInterval(()=>{
        numeroAleatorio=Math.floor(Math.random() * 3) + 1;
        imagen.src="imagenes/img"+numeroAleatorio+".jpg";
    },3000);

    //Ejercicio 3, agregamos evento a la imagen para que aparezca en el panel de opciones
    imagen.addEventListener("click",(e)=>{
        panelOpciones.innerHTML="<li><a>Filtro 1</a></li><li><a >Filtro 2</a></li><li><a >Filtro 3</a></li>"
    });

    //Ejercicio 4, hacer clic con el botón derecho del ratón
    imagen.addEventListener("contextmenu",(e)=>{
        e.preventDefault();
        alert("No se puede hacer click con el botón derecho");
    })

};


//Seccion Formulario
var Formulario=function(){
    primeraVez=true;
    primeraVezAsignatura=true;
    nuevaSeccion.innerHTML="";
    panelOpciones.innerHTML="";
    
    //apartado 1, que aparezcan los segundos
    var segundos=document.createElement("h3");
    var contador=0;
    segundos.textContent=contador+" sg.";
    panelOpciones.appendChild(segundos);
    setInterval(()=>{
        contador++;
        segundos.textContent=contador+" sg.";    
    },1000);

    //apartado 2, generar el formulario
    var formulario=document.createElement("form");
    formulario.style.display="block";

    var labelNombre=document.createElement("label");
    labelNombre.textContent="Nombre";
    labelNombre.style.display="block";
    
    var inputNombre=document.createElement("input");
    inputNombre.type="text";
    inputNombre.placeholder="Nombre";
    inputNombre.style.display="block";
    
    var labelAsignatura=document.createElement("label");
    labelAsignatura.textContent="Asignatura";
    labelAsignatura.style.display="block";

    var inputAsignatura=document.createElement("input");
    inputAsignatura.type="text";
    inputAsignatura.placeholder="Asignatura";
    inputAsignatura.style.display="block";
    
    var labelLista=document.createElement("label");
    labelLista.textContent="Nota";
    labelLista.style.display="block";

    var listaDesplegable=document.createElement("select");
    for(let i=0; i<=10;i++)
    {
        var opcion=document.createElement("option");
        opcion.value=i;
        opcion.textContent=i;
        opcion.style.display="block";
        listaDesplegable.appendChild(opcion);
    }

    formulario.appendChild(labelNombre);
    formulario.appendChild(inputNombre);
    formulario.appendChild(labelAsignatura);
    formulario.appendChild(inputAsignatura);
    formulario.appendChild(labelLista); 
    formulario.appendChild(listaDesplegable); 

    
    nuevaSeccion.appendChild(formulario);

    //apartado 3, pasar el ratón por encima del inputNombre
    inputNombre.addEventListener("mouseover",(e)=>{

        textoRatonEncimaInputNombre=document.createElement("h3");
        textoRatonEncimaInputNombre.textContent="Estas sobre el nombre";
        panelOpciones.appendChild(textoRatonEncimaInputNombre);
    });

    //apartado 4, al salir el texto anterior se quita
    inputNombre.addEventListener("mouseout",(e)=>{
        //eliminamos el último hijo del control panelOpciones
        panelOpciones.removeChild(textoRatonEncimaInputNombre);
    });

    //apartado 5, al cambiar la nota esta aparece en el panel de opciones
    listaDesplegable.addEventListener("change",(e)=>{
        if(primeraVez==true)
        {
            notaSeleccionada=document.createElement("h4");
            notaSeleccionada.textContent="La nota ha cambiado a "+listaDesplegable.value;
            panelOpciones.appendChild(notaSeleccionada);
            primeraVez=false;
        }
        else
            notaSeleccionada.textContent="La nota ha cambiado a "+listaDesplegable.value;
    });

    //apartado 6, al escribir sobre asignatura se muestra en el panel de opciones
    inputAsignatura.addEventListener("keyup",(e)=>{
        if(primeraVezAsignatura==true)
            {
                valorAsignatura=document.createElement("h4");
                valorAsignatura.textContent="La asignatura es "+inputAsignatura.value;
                panelOpciones.appendChild(valorAsignatura);
                primeraVezAsignatura=false;
            }
            else
                valorAsignatura.textContent="La asignatura es "+inputAsignatura.value;

    });

};

//Sección Listado
var Listado=function(){
    limiteElementos=0;
    nuevaSeccion.innerHTML="";
    panelOpciones.innerHTML="";

    
    //apartado 1, añadir los dos botones
    var anadirElemento=document.createElement("button");
    anadirElemento.textContent="Añadir Elemento";

    var resetearListado=document.createElement("button");
    resetearListado.textContent="Resetear Listado";

    nuevaSeccion.appendChild(anadirElemento);
    nuevaSeccion.appendChild(resetearListado);

    //apartado 2, añadir elementos
    anadirElemento.addEventListener("click",(e)=>{
        if(limiteElementos<5)
            {
                var elementoLista=document.createElement("div");
                elementoLista.draggable=true;
                elementoLista.id="ElementoLista"+limiteElementos;

                var cabecera=document.createElement("h3");
                var pequenoTexto=document.createElement("h4");
                cabecera.textContent="Cabecera";
                pequenoTexto.textContent="Pequeño texto";
                
                elementoLista.appendChild(cabecera);
                elementoLista.appendChild(pequenoTexto);
                nuevaSeccion.appendChild(elementoLista);

                // Eventos para el arrastre
                elementoLista.addEventListener('dragstart', (event) => {
                        event.dataTransfer.setData('text/plain', event.target.id); // Guardar el id del elemento arrastrado
                        
                });
                
                limiteElementos++;
            }      
            else
            {
                alert("Has alcanzado el límite de elementos")
            }
    });

    //apartado 3, al pulsar resetear se eliminan todos los elementos
    resetearListado.addEventListener("click",(e)=>{
        //obtenemos todos los elelmentos div
        var listadoElementosDiv=nuevaSeccion.querySelectorAll("div");
        listadoElementosDiv.forEach(hijo=>{
            nuevaSeccion.removeChild(hijo);
        });
        limiteElementos=0;
    })

    //apartado 4, crear zona para arrastre en el panel de opciones
    var zonaArrastre=document.createElement("div");
    zonaArrastre.classList.add("drop-area");
    
    panelOpciones.appendChild(zonaArrastre);

    //eventos para la zona de Arrastre

    zonaArrastre.addEventListener('dragover', (event) => {
        event.preventDefault(); // Necesario para permitir soltar
        
    });

    zonaArrastre.addEventListener('drop', (event) => {
        event.preventDefault();
        
        const draggedElementId = event.dataTransfer.getData('text/plain'); // Recuperar el id del elemento
        const draggedElement = document.getElementById(draggedElementId).cloneNode(true);

        zonaArrastre.appendChild(draggedElement); // Mover el elemento al área de destino
        alert("Se ha soltado el elemento de la lista");

        //Si quisieramos que la zona de arrastre se limpiara cada vez que se arrastra algo, sólo tendríamos
        //que hacer zonaArrastre.innerHTML=""  antes del zonaArrastre.appendChild(draggedElement);
    });

    
};