// app/rebajas/page.js
import SalesCountdown from '../components/SalesCountdown';
import SalesGalleryItem from '../components/SalesGalleryItem';
import { products } from '../data/data.js';

// --- 1. PREPARAMOS LOS DATOS (¡MODIFICADO!) ---
function getSaleData() {
  
  // ❗️ Definimos los 4 slugs exactos que queremos mostrar
  const saleSlugs = [
    'polo-retro-long-size',    // <-- 1. HOMBRE
    'camiseta-escape-ordinary', // <-- 2. MUJER
    'stressen-graffik-wood',  // <-- 3. PERFUME
    'stressen-noir-fusion'    // <-- 4. PERFUME
  ];

  // ❗️ Construimos la lista a partir de esos slugs
  return saleSlugs.map((slug) => {
    const product = products[slug];

    // Asignamos la ruta base correcta (¡importante para el link!)
    let basePath = 'hombre'; // Por defecto
    if (product.ref.startsWith("REF. 4")) {
      basePath = 'mujer';
    } else if (product.ref.startsWith("REF. 801")) {
      basePath = 'perfumes';
    }

    return {
      slug: slug,
      product: product,
      basePath: basePath 
    };
  });
}

// --- 2. LA PÁGINA (Sin cambios en el JSX) ---
export default function RebajasPage() {
  const itemsEnRebajas = getSaleData();

  return (
    <div className="w-full p-4 md:p-8 overflow-x-hidden">
      
      {/* Encabezado y Contador */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">REBAJAS</h1>
        <p className="text-xl mb-8">¡Nuestras ofertas terminan pronto!</p>
        <SalesCountdown />
      </div>

      {/* Layout ZigZag */}
      <div className="flex flex-col gap-12 md:gap-20">
        
        {itemsEnRebajas.map((item, index) => (
          <div 
            key={item.slug}
            className={`flex w-full ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            <div className="w-full max-w-lg md:max-w-2xl">
              <SalesGalleryItem 
                product={item.product}
                slug={item.slug}
                basePath={item.basePath}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}