var lista=document.getElementById("lista");
var boton2=document.getElementById("boton2");
var numeroElemento=4;
boton2.addEventListener('click', agregarElemento);

function agregarElemento()
{
    if(numeroElemento<6)
    {
        numeroElemento++;
        var elemento = document.createElement('li');
        var cadena="Elemento "+numeroElemento;
        elemento.textContent = cadena;
        elemento.className = "list-item";
        elemento.id="l"+numeroElemento;
        lista.appendChild(elemento);
        
    }
    else
    {
        var nuevoBoton= document.createElement('button');
        nuevoBoton.addEventListener('click',aplicarEstilo);
        nuevoBoton.className="button";
        nuevoBoton.innerText="Aplicar Estilo";
        document.getElementById("contenedorBotones").appendChild(nuevoBoton);
    }
}

function aplicarEstilo()
{
    for(i=1;i<7;i++)
    {
    document.getElementById("l"+i).className="list-item2";
    }
}