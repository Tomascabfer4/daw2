"use client"; // ¡Esencial! El contexto y el estado son del lado del cliente.

import { createContext, useState, useContext } from "react";

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear el Proveedor (El componente que "envuelve" la app)
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // Este es el estado global del carrito

  // Función para añadir un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Revisa si el producto ya está en el carrito
      const existingItem = prevCart.find((item) => item.ref === product.ref);

      if (existingItem) {
        // Si ya existe, actualiza la cantidad
        return prevCart.map((item) =>
          item.ref === product.ref
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es nuevo, añádelo al carrito con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    console.log("Producto añadido:", product.title);
  };

  const removeFromCart = (productRef) => {
    setCart((prevCart) => {
      // Filtra el carrito, devolviendo un nuevo array SIN el producto
      return prevCart.filter((item) => item.ref !== productRef);
    });
    console.log("Producto eliminado:", productRef);
  };

  return (
    // --- 2. AÑADE LA FUNCIÓN AL 'value' ---
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Crear un "hook" personalizado para usar el contexto fácilmente
export const useCart = () => {
  return useContext(CartContext);
};
