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
import PruebaLog from './Components/PruebaLog';

import VerReclamos from './Components/VerReclamos';
import GetAllReclamos from './Components/GetAllReclamos';

import AddReclamo from './Components/AddReclamo';
import CambiarEstado from './Components/CambiarEstado';

import GetReclamosByPersona from './Components/GetReclamosByPersonas';
import GetReclamosById from './Components/GetReclamosById';
import GetReclamosByEdi from './Components/GetReclamosByEdi';

import VerReclamosDeEdificio from './Components/VerReclamosDeEdificio';
import NavBar from './Components/Navbar';

// Definición del componente principal App
const App = () => {
  return(


      <AuthProvider>
        
        <Router>
          <NavBar/>
          <Routes>            
            <Route path="/" element={<Login/>}/>
            <Route path="/menu" element={<Menu/>}/>

            {/* Edificio */}
            {/* FUNCIONAN PIOLA */}
            <Route path="/addEdificio" element={<AddEdificio/>}/> 
            <Route path="/getEdificio" element={<GetEdificio/>}/>
            <Route path='/verEdificios' element= {<GetAllEdi/>}/>
            {/* Persona */}
            {/* FUNCIONAN PIOLA */}
            <Route path="/addPersona" element={<AddPersona/>}/>
            <Route path="/getPersona" element={<GetPersona/>}/>

            {/* Unidades */}
            {/* FUNCIONAN PIOLA */}
            <Route path="/addUnidad" element={<AddUnidad/>}/>
            <Route path="/getUnidad" element={<GetUnidad/>}/>

            {/* Duenio */}
            {/* FUNCIONAN PIOLA */}
            <Route path="/addDuenio" element={<AddDuenio/>}/>
            
            {/* Inquilino */}
            {/* FUNCIONAN PIOLA */}
            <Route path="/addInquilino" element={<AddInquilino/>}/>
            <Route path="/liberarUnidad" element={<LiberarUnidad/>}/>
            
            {/* no funca */}
            <Route path="/transferirUniDue" element={<TransferirUniDue/>}/>

            {/* Reclamos */}
            <Route path="/verReclamos" element={<VerReclamos/>}/> 
            <Route path="/VerTodosReclamos" element={<GetAllReclamos/>}/> 
            <Route path="/VerReclamosDeEdificio" element={<VerReclamosDeEdificio/>}/>
            <Route path="/addReclamo" element={<AddReclamo/>}/> 
            <Route path="/CambiarEstado" element={<CambiarEstado/>}/>
            <Route path="/getReclamosByPersona" element={<GetReclamosByPersona/>}/>
            <Route path="/getReclamosById" element={<GetReclamosById/>}/>
            <Route path="/getReclamosByEdi" element={<GetReclamosByEdi/>}/> 





          </Routes>

        </Router>
        
      </AuthProvider> 
  )

};

export default App;
