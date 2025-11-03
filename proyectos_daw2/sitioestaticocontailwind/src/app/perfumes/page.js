// app/perfumes/page.js

import Image from "next/image";
import PerfumeGrid from "../components/PerfumeGrid";
import { products } from "../data/data.js"; // Ajusta la ruta

// --- 3. FUNCIÓN DE DATOS ACTUALIZADA ---
function getPerfumeData() {
  
  // Usamos Object.entries para obtener [key, value] (ej: ["slug-del-polo", {producto}])
  const allProductEntries = Object.entries(products);

  // Filtramos solo los perfumes
  const perfumeEntries = allProductEntries.filter(([slug, product]) => 
    product.ref.startsWith("REF. 801")
  );

  // Transformamos los datos al formato que espera el Grid
  const perfumeList = perfumeEntries.map(([slug, product]) => {
    return {
      // Pasamos todos los datos que ya tenías...
      id: product.ref, 
      name: product.title,
      price: product.price,
      image: product.images[0],
      description: product.description,
      family: product.fits,
      composicion: product.composicion,
      
      // --- ❗️ AQUÍ ESTÁ LA CLAVE AÑADIDA ❗️ ---
      slug: slug 
    };
  });

  return perfumeList;
}


export default function PerfumesPage() {
  
  const perfumes = getPerfumeData();

  return (
    <div className="min-h-screen w-full bg-base-100 text-base-content">
      {/* Imagen de portada */}
      <div className="relative w-full h-[100vh] flex justify-center bg-base-100 overflow-hidden">
        <Image
          src="/perfumes/perfumesLarga.png"
          alt="Todos los perfumes"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Lista de perfumes */}
      <h1 className="text-4xl font-bold mt-8 text-center">Nuestros Perfumes</h1>
      
      {/* 'PerfumeGrid' ahora recibe la lista de perfumes, CADA UNO CON SU SLUG */}
      <PerfumeGrid perfumes={perfumes} />
    </div>
  );
}