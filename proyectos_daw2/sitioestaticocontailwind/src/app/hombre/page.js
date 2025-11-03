import ProductCard from "../components/ProductCard";
import { products } from "../data/data.js"; 

export default function HombrePage() {
  
  const allProducts = Object.values(products);

  // --- FILTRO CORREGIDO ---
  // Ahora filtra productos que NO sean perfumes (801) Y TAMPOCO sean de mujer (4)
  const menProducts = allProducts.filter(
    (product) => 
      !product.ref.startsWith("REF. 801") && 
      !product.ref.startsWith("REF. 4") 
  );

  const getSlugFromRef = (ref) => {
    return Object.keys(products).find(key => products[key].ref === ref);
  }

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {menProducts.map((product) => (
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