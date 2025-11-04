// app/components/SalesGalleryItem.js
import Image from 'next/image';
import Link from 'next/link';

export default function SalesGalleryItem({ product, slug, basePath }) {
  
  return (
    // 'group' para el hover, 'overflow-hidden' para las esquinas
    <div className="overflow-hidden group rounded-box">
      <Link href={`/${basePath}/${slug}`}>
        
        <figure>
          <Image
            src={product.images[0]} 
            alt={product.title}
            
            // Proporción 1:1 (cuadrado)
            width={300}  
            height={300} 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
          />
        </figure>
      </Link>
    </div>
  );
}