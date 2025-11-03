"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
// Asumiendo que data.js está en app/data/data.js
import { products } from "../data/data.js"; 
// Asumiendo que CartContext.js está en app/context/CartContext.js
import { useCart } from "../../context/CartContext.js";

// Renombrado a ProductDetail para ser genérico
export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug;
  const product = products[slug];

  // 🔔 LÓGICA CLAVE: Identificar si es un perfume
  const isPerfume = product ? product.ref.startsWith("REF. 801") : false;

  const [mainImage, setMainImage] = useState(product ? product.images[0] : null);
  const { addToCart } = useCart();

  const [showAlert, setShowAlert] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleAddToCart = () => {
    // Aquí podrías añadir lógica de validación (ej. si no es perfume, ¿ha elegido talla?)
    addToCart(product);
    setShowAlert(true);
    setFadeOut(false);
    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(() => setShowAlert(false), 3000);
  };

  if (!product) {
    return (
      <div className="p-8 text-center text-xl">Producto no encontrado 😢</div>
    );
  }

  if (!mainImage && product.images.length > 0) {
    setMainImage(product.images[0]);
  }

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Alerta flotante */}
      {showAlert && (
        <div
          className={`
            fixed bottom-6 right-6 z-50
            transition-all duration-700
            transform
            ${fadeOut ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
          `}
        >
          <div
            role="alert"
            className="alert alert-vertical sm:alert-horizontal shadow-lg bg-base-200 border border-base-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-sm">
              ✅ {product.title} se ha añadido al carrito.
            </span>
            <div>
              <button className="btn btn-sm" onClick={() => setShowAlert(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-8">
        {/* Galería de Imágenes */}
        <div className="lg:col-span-2 flex">
          <div className="hidden lg:flex flex-col space-y-2 pr-4">
            <ThumbnailGallery
              images={product.images}
              title={product.title}
              onImageSelect={setMainImage}
              activeImage={mainImage}
            />
          </div>
          <div className="flex-grow aspect-[3/4] bg-gray-100 relative overflow-hidden">
            {mainImage && (
              <Image
                src={mainImage}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>

        {/* Columna de información */}
        <div className="lg:col-span-1 p-4 lg:p-0">
          <div className="sticky top-20">
            <h1 className="text-4xl font-light mb-2">{product.title}</h1>
            <p className="text-2xl font-semibold mb-6">{product.price}</p>
            <hr className="mb-6" />

            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* CAMBIO: Mostrar selector de tallas SÓLO para ropa */}
            {!isPerfume && (
              <>
                <p className="text-sm font-semibold mt-6 mb-2">
                  Selecciona una talla
                </p>
                <select className="select select-ghost w-full mb-6">
                  <option disabled={true}>Selecciona una talla</option>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </>
            )}

            {/* CAMBIO: Mostrar familia olfativa SÓLO para perfumes */}
            {isPerfume && (
              <>
                <p className="text-sm font-semibold mt-6 mb-2">
                  Familia Olfativa
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.fits.map((family) => (
                    <span key={family} className="badge badge-outline">
                      {family}
                    </span>
                  ))}
                </div>
              </>
            )}

            <button
              className="btn btn-neutral w-full px-8 text-lg font-bold rounded-none"
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>

            {/* Acordeones */}
            <div className="mt-8 join join-vertical w-full">
              {/* CAMBIO: Título y contenido dinámico para composición */}
              <Accordion 
                title={isPerfume ? "Notas Olfativas" : "Composición y cuidado"}
              >
                <ProductComposition product={product} />
              </Accordion>
              <Accordion title="Disponibilidad en tienda">
                Consulta la disponibilidad en nuestras tiendas físicas.
              </Accordion>
              <Accordion title="Envíos y devoluciones">
                Tienes 30 días para devoluciones gratuitas.
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Pie del producto */}
      <div className="lg:w-2/3 mt-12 mb-8 text-xs text-gray-500 flex justify-between px-4 lg:px-0">
        <p>{product.ref}</p>
        <button className="text-gray-700 hover:underline">ⓘ Cookie</button>
      </div>
    </div>
  );
}

// --- COMPONENTES HIJO ---

function ThumbnailGallery({ images, title, onImageSelect, activeImage }) {
  return (
    <>
      {images.map((img, i) => (
        <div
          key={i}
          onClick={() => onImageSelect(img)}
          className={`relative w-16 h-20 bg-gray-100 overflow-hidden cursor-pointer border
            transition-all duration-200 ease-in-out
            ${
              img === activeImage
                ? "border-black ring-1 ring-black"
                : "border-gray-300 hover:border-black"
            }`}
        >
          <Image
            src={img}
            alt={`${title} - Vista ${i + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </>
  );
}

function Accordion({ title, children }) {
  return (
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="product-accordion" />
      <div className="collapse-title text-sm font-medium p-0 py-3">
        <span>{title}</span>
      </div>
      <div className="collapse-content px-0">
        <div className="text-xs text-gray-600 pb-2">{children}</div>
      </div>
    </div>
  );
}

function ProductComposition({ product }) {
  const isPerfume = product.ref.startsWith("REF. 801");

  // Si no es perfume, muestra el texto simple
  if (!isPerfume) {
    return <p>{product.composicion}</p>;
  }

  // Si es perfume, formatea las notas
  try {
    const parts = product.composicion.split(/TOP:|HEART:|BASE:/);
    const notes = {
      size: parts[0]?.trim() || '',
      top: parts[1]?.replace('.', '').trim() || '',
      heart: parts[2]?.replace('.', '').trim() || '',
      base: parts[3]?.replace('.', '').trim() || '',
    };

    return (
      <div className="space-y-1">
        {notes.size && <p className="font-semibold">{notes.size}</p>}
        {notes.top && <p><strong className="uppercase">TOP:</strong> {notes.top}</p>}
        {notes.heart && <p><strong className="uppercase">HEART:</strong> {notes.heart}</p>}
        {notes.base && <p><strong className="uppercase">BASE:</strong> {notes.base}</p>}
      </div>
    );
  } catch (e) {
    // Si falla el formateo, solo muestra el texto original
    return <p>{product.composicion}</p>;
  }
}