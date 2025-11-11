// Selección de elementos
const form = document.getElementById('registroForm');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const edad = document.getElementById('edad');
const genero = document.getElementById('genero');
const terminos = document.getElementById('terminos');

// Eventos
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente, es decir, evito el evento
    alert('Formulario enviado con éxito.');
});
/*preventDefault() en JavaScript se utiliza para evitar el comportamiento predeterminado de un evento. 
Este método es especialmente útil cuando quieres controlar qué sucede después de que un evento ocurre, 
en lugar de permitir que el navegador realice la acción predeterminada.

Ejemplos
Modificar enlaces sin seguir la URL: Los enlaces (<a href="...">) tienen como comportamiento predeterminado 
redirigir al usuario a otra página. Si deseas manejar el clic en un enlace de manera personalizada 
(por ejemplo, abrir un modal en lugar de ir a otra página), puedes usar e.preventDefault():

o
const enlace = document.querySelector('a');
enlace.addEventListener('click', (e) => {
    e.preventDefault(); // Evita la redirección
    console.log('Se hizo clic en el enlace');
});

Evitar la recarga por defecto en botones dentro de formularios: 
En un formulario, cualquier botón tiene por defecto el comportamiento de intentar enviar el formulario. 
Con e.preventDefault(), puedes evitarlo:


const boton = document.querySelector('button');
boton.addEventListener('click', (e) => {
    e.preventDefault(); // Evita el envío del formulario
    console.log('Botón clickeado');
});

Uso Recomendado
e.preventDefault() debe usarse cuando desees:

Detener comportamientos automáticos del navegador.
Implementar tu propia lógica personalizada para manejar un evento.

*/

form.addEventListener('reset', () => {
    alert('Formulario reiniciado.');
});

nombre.addEventListener('focus', () => {
    nombre.style.borderColor = 'blue';
});

nombre.addEventListener('blur', () => {
    if (nombre.value.trim() === '') {
        
        alert('El nombre no puede estar vacío.');
    }
    
});

nombre.addEventListener('input', () => {
    console.log(`Nombre ingresado: ${nombre.value}`);
});

email.addEventListener('change', () => {
    console.log(`Correo actualizado a: ${email.value}`);
});

password.addEventListener('input', () => {
    const strength = password.value.length > 8 ? 'Fuerte' : 'Débil';
    console.log(`Fortaleza de la contraseña: ${strength}`);
});

nombre.addEventListener('copy', () => {
    
    alert('Estar copiando el nombre.');
});

edad.addEventListener('input', () => {
    if (edad.value < 18 || edad.value > 100) {
        edad.style.borderColor = 'red';
    } else {
        edad.style.borderColor = 'green';
    }
});

genero.addEventListener('change', () => {
    console.log(`Género seleccionado: ${genero.value}`);
});

terminos.addEventListener('click', () => {
    if (terminos.checked) {
        console.log('Términos aceptados.');
    } else {
        console.log('Términos rechazados.');
    }
});

window.addEventListener('load', () => {
    console.log('Página cargada completamente.');
});

window.addEventListener('resize', () => {
    console.log('La ventana ha sido redimensionada.');
});

window.addEventListener('scroll', () => {
    console.log('Usuario está desplazándose por la página.');
});

form.addEventListener('mouseenter', () => {
    form.style.backgroundColor = '#f9f9f9';
});

form.addEventListener('mouseleave', () => {
    form.style.backgroundColor = 'white';
});

document.addEventListener('keydown', (e) => {
    console.log(`Tecla presionada: ${e.key}`);
});

document.addEventListener('keyup', (e) => {
    console.log(`Tecla soltada: ${e.key}`);
});

document.addEventListener('click', (e) => {
    console.log(`Click en: ${e.target.tagName}`);
});

nombre.addEventListener('paste', () => {
    alert('No se permite pegar texto en el campo Nombre.');
});
