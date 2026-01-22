function ListaCondicional1()
{
    const vector=[0,1,2,3,4,5,6,7,8];
      
    return (
        //no se puede usar if dentro del return
        //sólo el operador ternario
        <ul>
            {
                vector.map((valor,indice)=>(
                    valor%2===0?<li key={indice}>{valor}</li>:null
                )
                
                )

                
            }
        </ul>
    );
    
}

//se puede usar un if fuera del return sin problemas, incluso que el return devuelva
//una cosa u otra según el valor de ese if. Pero no se puede cuando quieres
//devolver varias etiquetas o componentes según una condición. Para una sola etiqueta
//si podría ser adecuado fuera del return

export default ListaCondicional1;