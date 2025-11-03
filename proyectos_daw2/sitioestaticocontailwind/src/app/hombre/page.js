import ProductCard from "../components/ProductCard"; // Ajusta la ruta a tu componente de tarjeta
import { products } from "../data/data.js"; // Importa tus datos

export default function HombrePage() {
  
  // 1. Convertimos el objeto de productos en un array
  const allProducts = Object.values(products);

  // 2. Filtramos para quedarnos SÓLO con la ropa (excluimos los perfumes)
  const menProducts = allProducts.filter(
    (product) => !product.ref.startsWith("REF. 801") // Fíjate en el "!" (no)
  );

  // 3. Función para encontrar el slug (la 'key' del objeto)
  const getSlugFromRef = (ref) => {
    return Object.keys(products).find(key => products[key].ref === ref);
  }

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 4. Mapeamos los productos de hombre y creamos una Card para cada uno */}
        {menProducts.map((product) => (
          <ProductCard
            key={product.ref} // Usamos una key única
            title={product.title}
            price={product.price}
            image1={product.images[0]} // Primera imagen
            image2={product.images[1]} // Segunda imagen
            slug={getSlugFromRef(product.ref)} // Pasamos el slug correcto
          />
        ))}

      </div>
    </div>
  );
}