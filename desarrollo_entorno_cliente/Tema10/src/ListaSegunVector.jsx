function ListaSegunVector(props) {


return(
    <ul>
      {
        //al no tener una key propia, creamos una, en este caso el índice
        //que sabemos que es único
        props.vector.map((contenido, indice) => (
        <li key={indice}>{contenido}</li>
      ))}
    </ul>



);


}

export default ListaSegunVector;