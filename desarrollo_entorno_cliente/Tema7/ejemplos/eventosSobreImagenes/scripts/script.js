// Imágenes disponibles
const images = ["imagenes/img1.jpg", "imagenes/img2.jpg", "imagenes/img3.jpg", "imagenes/img4.jpg", "imagenes/img5.jpg"];

// Elementos del DOM
const img1Select = document.getElementById("img1-select");
const img2Select = document.getElementById("img2-select");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const swapButton = document.getElementById("swap-images");
const resizeButton = document.getElementById("resize-image");
const filterButton = document.getElementById("filter-image");
const hideButton = document.getElementById("hide-image");

// Rellenar selects
function populateSelects() {
    images.forEach(img => {
        const option1 = document.createElement("option");
        option1.value = img;
        option1.textContent = img;

        const option2 = option1.cloneNode(true);

        img1Select.appendChild(option1);
        img2Select.appendChild(option2);
    });
}

// Cambiar imágenes
img1Select.addEventListener("change", () => {
    image1.src = img1Select.value;
});

img2Select.addEventListener("change", () => {
    image2.src = img2Select.value;
});

// Intercambiar imágenes
swapButton.addEventListener("click", () => {
    const temp = image1.src;
    image1.src = image2.src;
    image2.src = temp;
});

// Cambiar tamaño
resizeButton.addEventListener("click", () => {
    image1.style.width = image1.style.width === "150px" ? "200px" : "150px";
});

// Cambiar filtro
let filterApplied = false;
filterButton.addEventListener("click", () => {
    filterApplied = !filterApplied;
    image2.style.filter = filterApplied ? "grayscale(100%)" : "none";
});

// Ocultar imagen
hideButton.addEventListener("click", () => {
    image1.style.display = image1.style.display === "none" ? "block" : "none";
});

// Eventos sobre imágenes
image1.addEventListener("mouseover", () => {
    image1.style.opacity = "0.8";
});
image1.addEventListener("mouseout", () => {
    image1.style.opacity = "1";
});
image2.addEventListener("dblclick", () => {
    alert("¡Hiciste doble clic en la imagen 2!");
});
image1.addEventListener("click", () => {
    image1.style.border = "2px solid red";
});
image2.addEventListener("mouseenter", () => {
    image2.style.transform = "scale(1.1)";
});
image2.addEventListener("mouseleave", () => {
    image2.style.transform = "scale(1)";
});

// Inicializar
populateSelects();
