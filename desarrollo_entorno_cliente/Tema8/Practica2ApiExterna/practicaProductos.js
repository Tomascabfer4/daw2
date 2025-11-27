let listadoProductos = [];
const contenedorProductos = document.getElementById("contenedorProductos");
const selectCategorias = document.getElementById("categorias");
const buscar = document.getElementById("buscar");
const botonOrdenar = document.getElementById("botonOrdenar");

const tarjetaProducto = document.createElement("div");
tarjetaProducto.className = "tarjetaProducto";

const imagenProducto = document.createElement("img");
tarjetaProducto.appendChild(imagenProducto);

const infoProducto = document.createElement("div");
infoProducto.className = "tarjetaInfo";

const tituloProducto = document.createElement("h2");
infoProducto.appendChild(tituloProducto);

const descripcionProducto = document.createElement("p");
infoProducto.appendChild(descripcionProducto);

const categoriasProducto = document.createElement("span");
categoriasProducto.className = "categorias";
infoProducto.appendChild(categoriasProducto);

const puntuacion = document.createElement("p");
infoProducto.appendChild(puntuacion);

const numeroOpiniones = document.createElement("p");
infoProducto.appendChild(numeroOpiniones);

const precio = document.createElement("p");
infoProducto.appendChild(precio);

tarjetaProducto.appendChild(infoProducto);

const leerJson = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error cargando el JSON:", error);
    return [];
  }
};

const mostrarProductos = (productosParaMostrar) => {
  contenedorProductos.innerHTML = "";
  productosParaMostrar.forEach((producto) => {
    const nuevoProducto = tarjetaProducto.cloneNode(true);
    nuevoProducto.children[0].src = producto.image;
    const info = nuevoProducto.children[1];
    info.children[0].innerText = producto.title;
    info.children[1].innerText = producto.description;
    info.children[2].innerText = producto.category;
    info.children[3].innerHTML = `⭐ ${producto.rating.rate} (${producto.rating.count} opiniones)`;
    info.children[4].innerHTML = `<strong>Precio:</strong> $${producto.price}`;
    contenedorProductos.appendChild(nuevoProducto);
  });
};

const cargarSelect = () => {
  const todasLasCategorias = listadoProductos.flatMap(
    (producto) => producto.category
  );
  const categoriasUnicas = [...new Set(todasLasCategorias)];
  const optionTodas = document.createElement("option");
  optionTodas.value = "todas";
  optionTodas.innerText = "Todas las categorías";
  selectCategorias.appendChild(optionTodas);

  categoriasUnicas.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.innerText = categoria;
    selectCategorias.appendChild(option);
  });

  selectCategorias.addEventListener("change", (evento) => {
    const seleccion = evento.target.value;
    if (seleccion === "todas") {
      mostrarProductos(listadoProductos);
    } else {
      const productosFiltrados = listadoProductos.filter((producto) => {
        return producto.category.includes(seleccion);
      });
      mostrarProductos(productosFiltrados);
    }
  });
};

const busqueda = () => {
  buscar.addEventListener("change", (evento) => {
    const buscado = evento.target.value;
    const productoBuscado = listadoProductos.filter((producto) => {
      const tituloEnMinusculas = producto.title.toLowerCase();
      return tituloEnMinusculas.includes(buscado.toLowerCase());
    });
    mostrarProductos(productoBuscado);
  });
};

const ordenar = () => {
  botonOrdenar.addEventListener("click", () => {
    const productosOrdenados = [...listadoProductos].sort((a, b) => {
      return a.price - b.price;
    });
    mostrarProductos(productosOrdenados);
  });
};

const iniciarApp = async () => {
  listadoProductos = await leerJson();
  mostrarProductos(listadoProductos);
  cargarSelect();
  busqueda();
  ordenar();
};

iniciarApp();
