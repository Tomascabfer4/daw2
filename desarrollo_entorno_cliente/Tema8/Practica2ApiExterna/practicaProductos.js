// Me traigo los elementos del DOM y creo el vector para los productos.
let listadoProductos = [];
const contenedorProductos = document.getElementById("contenedorProductos");
const selectCategorias = document.getElementById("categorias");
const buscar = document.getElementById("buscar");
const botonOrdenar = document.getElementById("botonOrdenar");
const botonAnnadir = document.getElementById("botonAnnadir");
const botonGraficos = document.getElementById("botonGraficos");
const botonEspanol = document.getElementById("botonEspanol");
const botonIngles = document.getElementById("botonIngles");

// CONFIGURACIÓN I18N
// Se configuran las traducciones para cada uno de los idiomas soportados.
// const resources = {
//   es: {
//     translation: {
//       navbar: {
//         titulo: "Productos API",
//         busquedaPlaceholder: "Buscar productos...",
//       },
//       barraLateral: {
//         estadisticas: "Estadisticas",
//         agregacion: "Agregacion",
//         filtros: "Filtros",
//         categorias: "Categorías",
//         ordenar: "Ordenar",
//         botonOrdenar: "Precio: Menor a Mayor",
//         todasCategorias: "Todas las categorías",
//       },
//       tarjetaProducto: {
//         opiniones: "opiniones",
//         precio: "Precio",
//       },
//       footer: {
//         texto: "Productos API 2025",
//       },
//     },
//   },
//   en: {
//     translation: {
//       navbar: {
//         titulo: "API Products",
//         busquedaPlaceholder: "Search products...",
//       },
//       barraLateral: {
//         filtros: "Filters",
//         categorias: "Categories",
//         ordenar: "Sort By",
//         botonOrdenar: "Price: Low to High",
//         todasCategorias: "All Categories",
//       },
//       tarjetaProducto: {
//         opiniones: "reviews",
//         precio: "Price",
//       },
//       footer: {
//         texto: "API Products 2025",
//       },
//     },
//   },
// };

// FUNCIÓN PARA ACTUALIZAR TEXTOS DEL DOM
// const actualizarTextosEstaticos = () => {
//   document.querySelectorAll("[data-i18n]").forEach((el) => {
//     const key = el.getAttribute("data-i18n");
//     el.innerText = i18next.t(key);
//   });
//   document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
//     const key = el.getAttribute("data-i18n-placeholder");
//     el.placeholder = i18next.t(key);
//   });
//   if (listadoProductos.length > 0) {
//     mostrarProductos(listadoProductos);
//   }
//   const opcionTodas = selectCategorias.querySelector('option[value="todas"]');
//   if (opcionTodas) opcionTodas.innerText = i18next.t("barraLateral.todasCategorias");
// };

// // Se llama al click de cualquiera de los dos Idiomas para actualizar el texto
// const cambiarIdioma = () => {
//   botonIngles.addEventListener("click", (evento) => {
//     i18next.changeLanguage("en", () => {
//       actualizarTextosEstaticos();
//     });
//   });
//   botonEspanol.addEventListener("click", (evento) => {
//     i18next.changeLanguage("es", () => {
//       actualizarTextosEstaticos();
//     });
//   });
// };

// i18next.init(
//   {
//     lng: "es",
//     debug: false,
//     resources,
//   },
//   (err, t) => {
//     actualizarTextosEstaticos();
//   }
// );

// Funcion asincrona que devuelve un vector con la informacion de la API.
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

// Funcion asincrona que añade un producto a la API y vuelve a cargar el json completo de la API
const crearProducto = async (producto) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      throw new Error(
        `Error en la petición: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log("Producto creado con éxito:", data);
    return data;
  } catch (error) {
    console.error("Error al intentar crear el producto:", error);
    return null;
  }
};

// Funcion asincrona que edita un producto pasandole la ip de la misma, despues vuelve a cargar el json completo de la API
const editarProducto = async (producto) => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/" + producto.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error en la petición: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log("Producto editado con éxito:", data);
    return data;
  } catch (error) {
    console.error("Error al intentar editar el producto:", error);
    return null;
  }
};

// Funcion asincrona que elimina un producto de la API y vuelve a cargar el json completo de la API
const eliminarProducto = async (producto) => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/" + producto.id,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error en la petición: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log("Producto eliminado con éxito:", data);
    return data;
  } catch (error) {
    console.error("Error al intentar eliminar el producto:", error);
    return null;
  }
};

// Borro el contenedor donde alojo todos los productos y recorro el vector por parametro clonando cada tarjeta del producto y asignandole cada valor.
const mostrarProductos = (productosParaMostrar) => {
  contenedorProductos.innerHTML = "";
  productosParaMostrar.forEach((producto) => {
    // Se crea la tarjeta donde almacenaremos cada producto.
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

    const divBotonesProducto = document.createElement("div");
    divBotonesProducto.className = "divBotonesProducto";

    const botonEditar = document.createElement("button");
    botonEditar.className = "botonProducto";
    divBotonesProducto.appendChild(botonEditar);

    const botonEliminar = document.createElement("button");
    botonEliminar.className = "botonProducto";
    divBotonesProducto.appendChild(botonEliminar);

    tarjetaProducto.appendChild(divBotonesProducto);

    // Se le da informacion a la tarjeta recien creada.
    tarjetaProducto.children[0].src = producto.image;
    const info = tarjetaProducto.children[1];
    info.children[0].innerText = producto.title;
    info.children[1].innerText = producto.description;
    info.children[2].innerText = producto.category;
    info.children[3].innerHTML = `⭐ ${producto.rating.rate} (${producto.rating.count} opiniones)`;
    info.children[4].innerHTML = `<strong>Precio:</strong> $${producto.price}`;
    const divBotones = tarjetaProducto.children[2];
    divBotones.children[0].innerText = "Editar";
    divBotones.children[1].innerText = "Eliminar";
    contenedorProductos.appendChild(tarjetaProducto);

    botonEditar.addEventListener("click", () => {
      contenedorProductos.innerHTML = "";
    });

    botonEliminar.addEventListener("click", () => {
      eliminarProducto(producto);
    });
  });
};

// Funcion que carga todas las categorias de los productos, que despues las mete en un set para que no haya duplicados.
// Despues crea cada categoria como una opcion del select creado en el DOM y por ultimo genera el evento change para buscar
// los productos por cada una de las categorias existentes.
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

// Se recoge el evento input del input de busqueda y se pasa a minusculas tanto la entrada del usuario como el nombre del producto
// para que haga la busqueda ignorando el tipo de letra.
const busqueda = () => {
  buscar.addEventListener("input", (evento) => {
    const buscado = evento.target.value;
    const productoBuscado = listadoProductos.filter((producto) => {
      const tituloEnMinusculas = producto.title.toLowerCase();
      return tituloEnMinusculas.includes(buscado.toLowerCase());
    });
    mostrarProductos(productoBuscado);
  });
};

// Se ordenan todos los productos creando otro vector ordenado a partir del vector listadoProductos.
const ordenar = () => {
  botonOrdenar.addEventListener("click", () => {
    const productosOrdenados = [...listadoProductos].sort((a, b) => {
      return a.price - b.price;
    });
    mostrarProductos(productosOrdenados);
  });
};

const formularioAnnadirProducto = () => {
  botonAnnadir.addEventListener("click", () => {
    contenedorProductos.innerHTML = "";
  });
};

const mostrarGraficos = () => {
  botonGraficos.addEventListener("click", () => {
    contenedorProductos.innerHTML = "";
  });
};

// Creamos la funcion asincrona para llamar a cada unas de las funciones de la app.
const iniciarApp = async () => {
  listadoProductos = await leerJson();
  mostrarProductos(listadoProductos);
  cargarSelect();
  busqueda();
  ordenar();
  formularioAnnadirProducto();
  mostrarGraficos();
  // cambiarIdioma();
};

iniciarApp();
