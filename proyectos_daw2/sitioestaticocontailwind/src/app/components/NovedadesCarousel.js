"use client";
import Image from "next/image";
import Link from "next/link";

export default function NovedadesCarousel({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-center">No hay novedades disponibles.</p>;
  }

  // --- 1. AÑADE ESTA FUNCIÓN ---
  // Esta función maneja el clic en las flechas de navegación
  const handleNavClick = (e, targetId) => {
    // 2. Previene el "salto" de scroll por defecto del navegador
    e.preventDefault(); 

    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // 3. Le dice al navegador que haga scroll SUAVEMENTE a ese slide
      // 'block: 'nearest'' es la clave: evita que se mueva la página entera.
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="carousel w-full max-w-6xl rounded-box shadow-2xl">
        {items.map((item, index) => {
          
          // --- Hacemos las variables de ID más claras ---
          const currentSlideId = `slide${index}`;
          const prevSlideId = `slide${index === 0 ? items.length - 1 : index - 1}`;
          const nextSlideId = `slide${index === items.length - 1 ? 0 : index + 1}`;

          return (
            <div
              key={item.slug}
              id={currentSlideId} // Aplicamos el ID aquí
              className="carousel-item relative w-full"
            >
              {/* Imagen principal (sin cambios) */}
              <Image
                src={item.product.images[0]}
                alt={item.product.title}
                width={1600}
                height={900}
                className="w-full h-[80vh] object-cover"
                priority={index === 0}
              />

              {/* Overlay (sin cambios) */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end items-center text-center p-10 text-white">
                <h2 className="text-4xl font-bold mb-3">{item.product.title}</h2>
                <p className="text-lg mb-6 max-w-2xl">{item.product.description}</p>
                <Link
                  href={`/${item.basePath}/${item.slug}`}
                  className="btn btn-primary"
                >
                  Ver Novedad
                </Link>
              </div>

              {/* --- 4. MODIFICAMOS LOS BOTONES --- */}
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a 
                  href={`#${prevSlideId}`} 
                  className="btn btn-circle"
                  // Añadimos el onClick
                  onClick={(e) => handleNavClick(e, prevSlideId)}
                >
                  ❮
                </a>
                <a 
                  href={`#${nextSlideId}`} 
                  className="btn btn-circle"
                  // Añadimos el onClick
                  onClick={(e) => handleNavClick(e, nextSlideId)}
                >
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}