const vectorJSON = [
    { "nombre": "Juan", "edad": 30, "ciudad": "Madrid"},
    { "nombre": "María", "edad": 25 },
    { "nombre": "Carlos", "edad": 35, "ciudad": "Valencia", "apellido": "García" },
    { "nombre": "Ana", "edad": 28, "ciudad": "Sevilla", "hermano": "Pedro" },
];

// const h1Nombre = document.getElementById('h1Nombre');
// const h1Edad = document.getElementById('h1Edad');
// const h1Ciudad = document.getElementById('h1Ciudad');
// const h2Nombre = document.getElementById('nombre');
// const h2Edad = document.getElementById('edad');
// const h2Ciudad = document.getElementById('ciudad');
// const siguiente = document.getElementById('siguiente');
// const mapa = vectorJSON[0];
// const vectorClaves = Object.keys(mapa);
// const vectorValores = Object.values(mapa);

const contenedor = document.getElementById('contenedor');

let posicion = 0;

siguiente.addEventListener('click', (evento) => {
    evento.preventDefault();
    Limpiar();
    let elementoJson = vectorJSON[posicion];
    Object.keys(elementoJson).forEach(clave => {
        const h1Clave = document.createElement('h1');
        h1Clave.innerText = clave;
        const valor = elementoJson[clave];
        const h2Valor = document.createElement('h2');
        h2Valor.innerText = valor;
        contenedor.appendChild(h1Clave);
        contenedor.appendChild(h2Valor);
    });
    posicion++;
    if (posicion >= 4){
        posicion = 0;
    }
});

function Limpiar(){
    contenedor.innerHTML = '';
}