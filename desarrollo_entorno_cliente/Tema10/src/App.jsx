import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListaSegunVector from './ListaSegunVector'
import ListaPropioKey from './ListaPropioKey'
import ListaDesdeUnMapa from './ListaDesdeUnMapa'
import ListaCondicional1 from './ListaCondicional1'
import ListaDesdeUnJson from './ListaDesdeUnJson'

function App() {
  const [count, setCount] = useState(0)

  const vector=["Blanco","Azul", "Amariillo", "Verde"];
  const vector2=[["Blanco","#FFFFFF"],["Rojo","#FF0000"],["Azul","#0000FF"]];
  const mapa= new Map([
        [0,"Blanco"],
        [1,"Rojo"],
        [2,"Azul"]
    ]);
  return (
    <>
      <h2>Lista sin Key propia</h2>
      <ListaSegunVector vector={vector}/>
      
      <h2>Lista con Key propia</h2>
      <ListaPropioKey vector={vector2}/>

      <h2>Lista desde un map</h2>
      <ListaDesdeUnMapa mapa={mapa}/>

      <h2>Lista condicional</h2>
      <ListaCondicional1/>
      
      <h2>Lista desde un JSON</h2>
      <ListaDesdeUnJson/>

    </>
  )
}

export default App
