// app/buscar/page.js
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // Necesario para useSearchParams
import { products } from "../data/data.js"; // Importa tus productos
import ProductCard from "../components/ProductCard"; // Importa tu tarjeta de producto

// 1. Creamos un componente interno para usar useSearchParams
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // Obtiene el "q" de la URL

  if (!query) {
    return <div className="p-8 text-center">Escribe algo para buscar.</div>;
  }

  // 2. Filtramos los productos
  const productEntries = Object.entries(products); // [slug, product]
  const lowerCaseQuery = query.toLowerCase();

  const filteredProducts = productEntries.filter(([slug, product]) => {
    const titleMatch = product.title.toLowerCase().includes(lowerCaseQuery);
    const descMatch = product.description
      .toLowerCase()
      .includes(lowerCaseQuery);
    return titleMatch || descMatch;
  });

  // 3. Función para encontrar el slug (la 'key' del objeto)
  const getSlugFromRef = (ref) => {
    return Object.keys(products).find((key) => products[key].ref === ref);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">
        {`Resultados para: "${query}"`}
      </h1>

      {/* 4. Mostramos los resultados */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map(([slug, product]) => (
            <ProductCard
              key={product.ref}
              title={product.title}
              price={product.price}
              image1={product.images[0]}
              image2={product.images[1]}
              slug={slug} // Ya tenemos el slug
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No se encontraron productos.</p>
      )}
    </div>
  );
}

// 5. Envolvemos el componente en Suspense
export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Cargando...</div>}>
      <SearchResults />
    </Suspense>
  );
}
