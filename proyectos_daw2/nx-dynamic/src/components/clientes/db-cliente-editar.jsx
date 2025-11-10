"use client";
import { editarClienteDB } from "@/lib/actionClientes";
import { useState } from "react";

function ClienteEditarDB({ cliente }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {visible && (
        <form className="my-10 grid grid-cols-[150px_auto] gap-4">
          <input type="hidden" name="id" defaultValue={cliente.id} />

          <label htmlFor="nombre">Nombre</label>
          <input
            required
            id="nombre"
            name="nombre"
            defaultValue={cliente.nombre}
            className="p-1 border border-slate-200 focus:outline-blue-300 text-lg"
          />

          <label htmlFor="apellido1">Primer Apellido</label>
          <input
            required
            id="apellido1"
            name="apellido1"
            defaultValue={cliente.apellido1}
            className="p-1 border border-slate-200 focus:outline-blue-300 text-lg"
          />

          <label htmlFor="apellido2">Segundo Apellido</label>
          <input
            required
            id="apellido2"
            name="apellido2"
            defaultValue={cliente.apellido2}
            className="p-1 border border-slate-200 focus:outline-blue-300 text-lg"
          />

          <label htmlFor="dni">DNI</label>
          <input
            required
            id="dni"
            name="dni"
            defaultValue={cliente.dni}
            className="p-1 border border-slate-200 focus:outline-blue-300 text-lg"
          />

          <label htmlFor="telefono">Telefono</label>
          <input
            required
            id="telefono"
            name="telefono"
            defaultValue={cliente.telefono}
            className="p-1 border border-slate-200 focus:outline-blue-300 text-lg"
          />

          <div className="col-span-2 grid gap-2">
            <button
              formAction={editarClienteDB}
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              Actualizar cliente
            </button>
          </div>
        </form>
      )}
      <span onClick={() => setVisible(!visible)}>{visible ? "✖" : "📝"}</span>
    </>
  );
}

export default ClienteEditarDB;
