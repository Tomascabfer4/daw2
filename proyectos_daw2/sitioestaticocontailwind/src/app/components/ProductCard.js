"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ title, price, image1, image2, slug }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/hombre/${slug}`}
      className="card-compact bg-base-100 hover:shadow-lg transition-all h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={isHovered ? image2 : image1}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 ease-in-out"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
      </figure>

      <div className="card-body text-base-content">
        <h2 className="card-title text-base font-medium">{title}</h2>
        <p className="text-sm">{price}</p>
      </div>
    </Link>
  );
}
