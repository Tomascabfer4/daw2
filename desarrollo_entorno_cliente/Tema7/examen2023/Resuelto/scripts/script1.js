

setInterval(() => {
    var numero=Math.floor(Math.random()*3)+1;
    console.log(numero);
    var imagen = document.getElementById("imagen2");
    switch(numero)
    {
        case 1:
            imagen.src="imagenes/imagen2.jpg";
            console.log("caso1");
            break;
        case 2:
            imagen.src="imagenes/imagen5.jpg";
            console.log("caso2");
            break;
        case 3:
            imagen.src="imagenes/imagen6.jpg";
            console.log("caso3");
            break;
        case 4:
             imagen.src="imagenes/imagen7.jpg";
             console.log("caso4");
             break;
    }


}, 2000);
