function ListaDesdeUnJson(){

    const jsonData = [
    { "nombre": "Juan", "edad": 30, "ciudad": "Madrid" },
    { "nombre": "María", "edad": 25, "ciudad": "Barcelona" },
    { "nombre": "Carlos", "edad": 35, "ciudad": "Valencia" },
    { "nombre": "Ana", "edad": 28, "ciudad": "Sevilla" }
  ];

  return(
  
     <ul>
      {jsonData.map((elemento, index) => (
        <li key={index}>
          {elemento.nombre} - {elemento.edad} años - {elemento.ciudad}
        </li>
      ))}
    </ul>

    //No nos olvidamos que con los json trabajamos con los Object.key y Object.value

  )
}

export default ListaDesdeUnJson;