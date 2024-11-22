import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  

import Login from './Components/Login';
import AddEdificio from './Components/AddEdificio';
import GetEdificio from './Components/GetEdificio';
import AddPersona from './Components/AddPersona';
import GetPersona from './Components/GetPersona';
import AddUnidad from './Components/AddUnidad';
import GetUnidad from './Components/GetUnidad';


// Definición del componente principal App
const App = () => {
  return(

    <BrowserRouter>
      
    <Routes>
      <Route path="/" element={<Login/>}/>
      {/* Edificio */}
      <Route path="/addEdificio" element={<AddEdificio/>}/>
      <Route path="/getEdificio" element={<GetEdificio/>}/>
      {/* Persona */}
      <Route path="/addPersona" element={<AddPersona/>}/>
      <Route path="/getPersona" element={<GetPersona/>}/>
      {/* Unidades */}
      <Route path="/addUnidad" element={<AddUnidad/>}/>
      <Route path="/getUnidad" element={<GetUnidad/>}/>

    </Routes>
    
    </BrowserRouter>
  )

};

export default App;


