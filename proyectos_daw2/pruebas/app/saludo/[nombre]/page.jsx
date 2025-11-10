import React from "react";

async function Page({ params, searchParams }) {
  const { nombre } = await params;

  return <div className="text-9xl"> Bienvenido {nombre}</div>;
}

export default Page;
