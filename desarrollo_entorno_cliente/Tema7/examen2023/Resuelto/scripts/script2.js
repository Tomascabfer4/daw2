var boton1= document.getElementById("boton1");
var imagen1=document.getElementById("imagen1");
var imagen3=document.getElementById("imagen3");
var pulsado=false;

boton1.addEventListener('click',intercambiarEstilos);

function intercambiarEstilos()
{
    if(pulsado==false)
    {
        imagen1.className="image3";
        imagen3.className="image1";
        pulsado=true;
    }
    else
    {
        imagen1.className="image1";
        imagen3.className="image3";
        pulsado=false;
    }
}