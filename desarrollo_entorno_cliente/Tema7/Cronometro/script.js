const displayMinutos = document.querySelector(".minutos");
const displaySegundos = document.querySelector(".segundos");
const botonIniciar = document.getElementById("iniciar");
const botonParar = document.getElementById("parar");
const botonDetener = document.getElementById("detener");
let tiempo = 0;
let intervalo = null;

function formatoDobleDigito(num) {
    return num.toString().padStart(2, '0');
}

function actualizarCronometro() {
    tiempo++; 
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    displayMinutos.textContent = formatoDobleDigito(minutos);
    displaySegundos.textContent = formatoDobleDigito(segundos);
}

function iniciarCronometro() {
    if (intervalo === null) {
        intervalo = setInterval(actualizarCronometro, 1000); 
        botonIniciar.disabled = true;
        botonParar.disabled = false;
    }
}

function pararCronometro() {
    clearInterval(intervalo);
    intervalo = null;
    botonIniciar.disabled = false;
    botonParar.disabled = true;
}

function resetearCronometro() {
    pararCronometro();
    displayMinutos.textContent = '00';
    displaySegundos.textContent = '00';
    botonIniciar.disabled = false; 
}

botonIniciar.addEventListener('click', iniciarCronometro);
botonParar.addEventListener('click', pararCronometro);
botonDetener.addEventListener('click', resetearCronometro);

