"use client"; 

import { useCart } from "../../context/CartContext.js"; 
import Link from "next/link";
import CartContents from "../components/CartContents.js"; 

export default function Carrito() {
  // --- 1. OBTÉN 'removeFromCart' DEL HOOK ---
  const { cart, removeFromCart } = useCart(); 

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="mb-6">¿No sabes qué comprar? ¡Echa un vistazo a nuestros productos!</p>
        <Link href="/" className="btn btn-primary">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  // --- 2. PASA LA FUNCIÓN COMO PROP ---
  return <CartContents cart={cart} removeFromCart={removeFromCart} />;
}