function ListaPropioKey(props) {

    

    return(
        <ul>
            {
                props.vector.map((elemento)=>(
                    
                    <li key={elemento[1]}>{elemento[0]}</li>

                )
            )
            
            }
        </ul>
    );
}

export default ListaPropioKey;