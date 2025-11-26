/*Tenemos el archivo almacenado de datos (json) almacenado en nuestro equipo
El navegador que ejecuta este javascript nunca podrá acceder a él por restricciones de seguridad
Por esto, tendremos que ejecutar esta aplicación desde un servidor web local, como puede ser Live Server. 

Dicho esto, esta práctica nos sirve para simular como obtener y parsear un archivo JSON que sería enviado
desde una APIREST.

En el caso de la APIREST y puesto que los datos están en un servidor, cada vez que necesitemos hacer una operación
con los mismos, sería interesante conectarse y descargarlos. Pero esto depende de la naturaleza de los datos
y de la aplicación web a desarrollar. No es lo mismo una web de compras, donde sus productos pueden varian en poco tiempo, 
falta de stock, modificación de precio etc. Que una API que nos devuelva datos sobre predicción del tiempo, cuyos datos
pueden pasar horas sin necesidad de que hayan cambiado. 
Por todo esto, debemos acceder a la API a pedir los datos en las siguientes situaciones:
- Bien sólo una vez, al principio de la carga de nuestra web
- Bien cada cierto tiempo de manera automática con un setInterval
- Bien por demanda cada vez que ocurra un evento, por ejemplo, hacer una búsqueda de productos en Amazón.

Aquí, suponemos que los datos son invariables en un periodo de tiempo medio y, por tanto, los obtenemos sólo
al principio de la carga de la web*/

let frutas;

async function cargarFrutas() {
  try {
    const respuesta = await fetch('https://www.fruityvice.com/api/fruit/all');
    const datos = await respuesta.json();

    return datos; 
  } catch (error) {
    console.error(error);
  }
}

async function iniciar() {
  frutas = await cargarFrutas();
  console.log(frutas);
}

iniciar();

