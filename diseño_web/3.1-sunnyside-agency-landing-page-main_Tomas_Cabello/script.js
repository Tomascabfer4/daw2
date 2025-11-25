const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.enlaces');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('activo');
});