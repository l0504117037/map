import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './Form'
import Map from './Map'

function App() {
  
const [coordinates,setCoordinates]=useState({lat: 32.0853, lon: 34.7818 })

  return (
    <div>
      <h2>saerch a office</h2>
    <Form setCoordinates={setCoordinates}/>
   <Map  latitude={coordinates.lat} longitude={coordinates.lon}/>
   
   </div>
  );
}


export default App
