document.addEventListener('DOMContentLoaded', () => {

    const agujaHora = document.querySelector('.reloj .hora');
    const agujaMinuto = document.querySelector('.reloj .minuto');
    const agujaSegundo = document.querySelector('.reloj .segundo');

    function actualizarReloj() {
        const fechaActual = new Date();

        const segundos = fechaActual.getSeconds();
        const gradosSegundo = segundos * 6;

        const minutos = fechaActual.getMinutes();
        const gradosMinuto = (minutos * 6) + (segundos * 0.1);

        const horas = fechaActual.getHours() % 12;
        const gradosHora = (horas * 30) + (minutos * 0.5);
        
        agujaSegundo.style.transform = `translateX(-50%) rotate(${gradosSegundo}deg)`;
        agujaMinuto.style.transform = `translateX(-50%) rotate(${gradosMinuto}deg)`;
        agujaHora.style.transform = `translateX(-50%) rotate(${gradosHora}deg)`;
    }

    actualizarReloj();
    setInterval(actualizarReloj, 1000);
});