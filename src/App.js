import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import PostList from './PostList';
import CommentList from './CommentList';
import Unidades from './Components/Unidades';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import AddEdificio from './Components/AddEdificio';
import AddPersona from './Components/AddPersona';

// Definición del componente principal App
const App = () => {
  return(

    <BrowserRouter>
      
    <Routes>
      <Route path="/" element={<Unidades/>}/>
      <Route path="/AddEdificio" element={<AddEdificio/>}/>
      <Route path="/AddPersona" element={<AddPersona/>}/>

    </Routes>
    
    </BrowserRouter>
  )

};

export default App;


