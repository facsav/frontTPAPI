import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';

import Login from './Components/Login';
import Menu from './Components/Menu';
import AddEdificio from './Components/AddEdificio';
import GetEdificio from './Components/GetEdificio';
import GetAllEdi from './Components/GetAllEdi';
import AddPersona from './Components/AddPersona';
import GetPersona from './Components/GetPersona';
import AddUnidad from './Components/AddUnidad';
import GetUnidad from './Components/GetUnidad';

import AddDuenio from './Components/AddDuenio';
import AddInquilino from './Components/AddInquilo';
import LiberarUnidad from './Components/LiberarUnidad';
import TransferirUniDue from './Components/TransferirUniDue';

// Definición del componente principal App
const App = () => {
  return(


      <AuthProvider>
        
        <Router>
          <Routes>            
            <Route path="/" element={<Login/>}/>
            <Route path="/menu" element={<Menu/>}/>

            {/* Edificio */}
            <Route path="/addEdificio" element={<AddEdificio/>}/>
            <Route path="/getEdificio" element={<GetEdificio/>}/>
            <Route path='/verEdificios' element= {<GetAllEdi/>}/>
            {/* Persona */}
            <Route path="/addPersona" element={<AddPersona/>}/>
            <Route path="/getPersona" element={<GetPersona/>}/>
            {/* Unidades */}
            <Route path="/addUnidad" element={<AddUnidad/>}/>
            <Route path="/getUnidad" element={<GetUnidad/>}/>

            <Route path="/addDuenio" element={<AddDuenio/>}/>
            <Route path="/addInquilino" element={<AddInquilino/>}/>
            <Route path="/liberarUnidad" element={<LiberarUnidad/>}/>
            <Route path="/transferirUniDue" element={<TransferirUniDue/>}/>

          </Routes>

        </Router>
        
      </AuthProvider> 
  )

};

export default App;
