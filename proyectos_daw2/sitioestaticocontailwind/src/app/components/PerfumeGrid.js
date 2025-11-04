"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function PerfumeNotes({ composicion }) {
  if (!composicion || !composicion.includes("TOP:") || !composicion.includes("HEART:")) {
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

export default function PerfumeGrid({ perfumes }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-20 flex flex-col gap-10">
      {perfumes.map((perfume, index) => (
        <Link href={`/perfumes/${perfume.slug}`} key={index}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            // ✅ Layout responsivo: columna en móvil, fila en escritorio
            className="bg-base-200 shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col md:flex-row rounded-xl overflow-hidden"
          >
            {/* Imagen arriba en móvil, a la izquierda en escritorio */}
            <figure className="relative w-full md:w-1/3 aspect-square md:aspect-auto">
              <Image
                src={perfume.image}
                alt={perfume.name}
                fill
                className="object-cover"
              />
            </figure>

            {/* Información debajo de la imagen en móvil */}
            <div className="flex flex-col justify-start p-6 md:p-8 gap-y-2 w-full">
              <h2 className="text-xl md:text-2xl font-bold">{perfume.name}</h2>
              <p className="text-base md:text-lg opacity-90 mb-2 md:mb-4">{perfume.price}</p>

              <p className="text-sm md:text-base max-w-lg">{perfume.description}</p>

              <PerfumeNotes composicion={perfume.composicion} />

              <div className="flex flex-wrap gap-2 mt-4">
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
