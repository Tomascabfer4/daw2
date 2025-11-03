// components/PerfumeGrid.js
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- NUEVO Componente Híjo ---
function PerfumeNotes({ composicion }) {
  if (!composicion || !composicion.includes("TOP:") || !composicion.includes("HEART:")) {
    // Hemos eliminado la clase opacity-80 para que sea más legible, como en tu ejemplo
    return <p className="text-base mt-4 max-w-lg">{composicion}</p>;
  }

  try {
    const parts = composicion.split(/TOP:|HEART:|BASE:/);
    const notes = {
      size: parts[0]?.trim() || '',
      top: parts[1]?.replace('.', '').trim() || '',
      heart: parts[2]?.replace('.', '').trim() || '',
      base: parts[3]?.replace('.', '').trim() || '',
    };

    return (
      // Añadimos max-w-lg para limitar el ancho y que se rompa en varias líneas
      <div className="text-base mt-4 space-y-1 max-w-lg">
        {notes.size && <p>{notes.size}</p>}
        {notes.top && <p><strong className="font-semibold uppercase">TOP:</strong> {notes.top}</p>}
        {notes.heart && <p><strong className="font-semibold uppercase">HEART:</strong> {notes.heart}</p>}
        {notes.base && <p><strong className="font-semibold uppercase">BASE:</strong> {notes.base}</p>}
      </div>
    );
  } catch (error) {
    return <p className="text-base mt-4 max-w-lg">{composicion}</p>;
  }
}


// --- Componente Principal Actualizado ---
export default function PerfumeGrid({ perfumes }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-20 flex flex-col gap-10">
      {perfumes.map((perfume, index) => (

        // --- 2. ENVUELVE LA TARJETA EN UN <Link> ---
        <Link 
          href={`/perfumes/${perfume.slug}`} // <-- Usa el slug para la URL
          key={index} // <-- Mueve la key al componente padre (<Link>)
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="card card-side bg-base-200 shadow-lg hover:shadow-xl transition-all cursor-pointer" // Añadido cursor-pointer
          >
            {/* Imagen lateral */}
            <figure className="relative w-1/3 min-w-[250px] aspect-[3/4]">
              <Image
                src={perfume.image}
                alt={perfume.name}
                fill
                className="object-cover rounded-l-xl"
              />
            </figure>

            {/* Contenido del perfume (sin cambios) */}
            <div className="card-body flex flex-col justify-start p-8 gap-y-1">
              <h2 className="card-title text-2xl font-bold">{perfume.name}</h2>
              <p className="text-lg opacity-90 mb-4">{perfume.price}</p>
              <p className="text-base max-w-lg">{perfume.description}</p>
              {/* <PerfumeNotes composicion={perfume.composicion} /> */} {/* Asumiendo que tienes este componente */}
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {perfume.family.map((item) => (
                  <span key={item} className="badge badge-outline">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
          </motion.div>
        </Link>
      ))}
    </section>
  );
}