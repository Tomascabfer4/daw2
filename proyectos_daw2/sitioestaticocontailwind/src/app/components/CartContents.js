import Image from "next/image";

// (La función calcularTotal no cambia)
function calcularTotal(cart) {
  let total = 0;
  cart.forEach(item => {
    const priceNumber = parseFloat(item.price.replace(" €", "").replace(",", "."));
    total += priceNumber * item.quantity;
  });
  return total.toFixed(2).replace(".", ",");
}

// --- 1. ACEPTA 'removeFromCart' COMO PROP ---
export default function CartContents({ cart, removeFromCart }) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              {/* --- 2. AÑADE UN ENCABEZADO PARA LA ACCIÓN --- */}
              <th></th> 
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.ref} className="hover">
                {/* Columna: Producto */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.title}</div>
                      <div className="text-sm opacity-50">{item.ref}</div>
                    </div>
                  </div>
                </td>
                
                {/* Columna: Precio */}
                <td>{item.price}</td>
                
                {/* Columna: Cantidad */}
                <td>{item.quantity}</td>
                
                {/* Columna: Subtotal */}
                <td>
                  {(
                    parseFloat(item.price.replace(" €", "").replace(",", ".")) * item.quantity
                  ).toFixed(2).replace(".", ",")} €
                </td>

                {/* --- 3. AÑADE EL BOTÓN DE ELIMINAR --- */}
                <td>
                  <button 
                    onClick={() => removeFromCart(item.ref)} 
                    className="btn btn-ghost btn-xs"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* (El resumen del total no cambia) */}
      <div className="mt-8 flex justify-end">
        <div className="text-right">
          <h2 className="text-2xl font-bold">
            Total: {calcularTotal(cart)} €
          </h2>
          <button className="btn btn-primary mt-4 w-full">
            Proceder al pago
          </button>
        </div>
      </div>
    </div>
  );
}