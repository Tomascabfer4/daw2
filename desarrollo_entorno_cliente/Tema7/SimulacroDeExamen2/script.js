const contenedor = document.getElementById("contenedor");
const botones = document.getElementsByClassName("botones")[0];
const btnIniciar = document.getElementById("btnIniciar");
const btnReiniciar = document.getElementById("btnReiniciar");
let h2Contador = null;

btnIniciar.addEventListener("click", function () {
  contenedor.innerHTML = "";
  let parrafo1 = document.createElement("p");
  parrafo1.textContent = "Este es el texto del parrafo1";
  parrafo1.addEventListener("click", function () {
    parrafo1.classList.add("resaltado");
  });
  contenedor.appendChild(parrafo1);
  let parrafo2 = document.createElement("p");
  parrafo2.textContent = "Este es el texto del parrafo2";
  parrafo2.addEventListener("click", function () {
    parrafo2.classList.add("resaltado");
  });
  contenedor.appendChild(parrafo2);
  let parrafo3 = document.createElement("p");
  parrafo3.textContent = "Este es el texto del parrafo3";
  parrafo3.addEventListener("click", function () {
    parrafo3.classList.add("resaltado");
  });
  contenedor.appendChild(parrafo3);

  let contador = 0;
  h2Contador = document.createElement("h2");
  botones.appendChild(h2Contador);
  let intervalo;

  intervalo = setInterval(() => {
    contador++;
    h2Contador.textContent = "Llevas : " + contador + " segundos de examen.";
    if (contador >= 10) {
      clearInterval(intervalo);
      btnIniciar.textContent = "Finalizado";
      btnIniciar.disabled = true;
      btnReiniciar.disabled = false;
    }
  }, 1000);
});

btnReiniciar.addEventListener("click", function () {
    if (h2Contador) { 
        h2Contador.remove(); 
    }
    contenedor.innerHTML = "";
    contador = 0;
    btnIniciar.textContent = "Iniciar";
    btnIniciar.disabled = false;
    btnReiniciar.disabled = true;
});


// const h2Anterior = botones.querySelector("h2");
//   if (h2Anterior) {
//     h2Anterior.remove();
//   }