function ListaDesdeUnMapa(props) {

     
      
    return(
        <ul>
            {
                //Map no tiene el método map, por tanto hay que convertirlo en 
                //un array
                
                [...props.mapa].map(([clave,valor])=>(
                    
                    <li key={clave}>{valor}</li>

                )
            )
            
            }
        </ul>
    );
}

export default ListaDesdeUnMapa;