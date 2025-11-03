import ProductCard from "../components/ProductCard";
import { products } from "../data/data.js"; 

export default function MujerPage() { // <-- Nombre de la función cambiado
  
  const allProducts = Object.values(products);

  // --- FILTRO PARA MUJER ---
  // Filtramos SÓLO los productos cuya REF empieza por "4"
  const womenProducts = allProducts.filter(
    (product) => product.ref.startsWith("REF. 4")
  );

  const getSlugFromRef = (ref) => {
    return Object.keys(products).find(key => products[key].ref === ref);
  }

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Mapeamos los productos de mujer */}
        {womenProducts.map((product) => ( 
          <ProductCard
            key={product.ref}
            title={product.title}
            price={product.price}
            image1={product.images[0]}
            image2={product.images[1]}
            slug={getSlugFromRef(product.ref)}
          />
        ))}

      </div>
    </div>
  );
}