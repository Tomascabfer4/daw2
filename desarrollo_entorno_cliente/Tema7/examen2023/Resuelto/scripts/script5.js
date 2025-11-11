var parrafo=document.getElementById("parrafo2");
var imagen=document.getElementById("imagen4");
var contenedor=document.getElementById("ultimoBloque");
parrafo.addEventListener('click', cambiarImagen);


function cambiarImagen()
{
   contenedor.appendChild(imagen);
}