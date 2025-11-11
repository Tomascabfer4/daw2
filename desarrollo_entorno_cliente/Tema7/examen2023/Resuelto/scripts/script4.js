var parrafo=document.getElementById("parrafo1");
parrafo.addEventListener('click', mostrarAlerta);

function mostrarAlerta()
{
    alert(parrafo.innerHTML);
}