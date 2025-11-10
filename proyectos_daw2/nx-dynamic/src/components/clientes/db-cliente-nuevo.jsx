import { nuevoClienteDB } from "@/lib/actionClientes";

function ClienteNuevoDB() {
  return (
    <form className="my-10 grid grid-cols-[150px_auto] gap-4">
      <label htmlFor="nombre">Nombre</label>
      <input
        required
        id="nombre"
        name="nombre"
        className="p-1 border border-slate-200 focus:outline-blue-300 text-lg"
      />

      <label htmlFor="apellido1">Primer Apellido:</label>
      <input
        required
        id="apellido1"
        name="apellido1"
        className="p-1 border border-slate-200 focus:outline-blue-300 text-lg"
      />

      <label htmlFor="apellido2">Segundo Apellido</label>
      <input
        required
        id="apellido2"
        name="apellido2"
        className="p-1 border border-slate-200 focus:outline-blue-300 text-lg"
      />

      <label htmlFor="dni">DNI</label>
      <input
        required
        id="dni"
        name="dni"
        className="p-1 border border-slate-200 focus:outline-blue-300 text-lg"
      />

      <label htmlFor="telefono">Telefono</label>
      <input
        required
        id="telefono"
        name="telefono"
        className="p-1 border border-slate-200 focus:outline-blue-300 text-lg"
      />

      <div className="col-span-2 grid gap-2">
        <button
          formAction={nuevoClienteDB}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Guardar cliente
        </button>
        <button
          type="reset"
          className="bg-slate-600 text-white px-4 py-2 rounded-xl"
        >
          Limpiar campos
        </button>
      </div>
    </form>
  );
}

export default ClienteNuevoDB;
