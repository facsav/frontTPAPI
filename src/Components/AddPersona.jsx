import React, { useState } from 'react';

//VALIDAR SI EXISTE EL USER 


const AddPersona = () => {

    // Definir estados para los campos de nombre e identificador
    const [documento , setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [nombreUser, setNombreUser] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [tipoUser, setTipoUser] = useState('');

  
    // Función para manejar el envío de datos
    const agregarPersona = () => {
      const Persona = {
        documento: documento,
        nombre: nombre,
        nombreUser: nombreUser,
        contrasenia: contrasenia,
        tipoUser: tipoUser
        
      };
  
      fetch('/addPersona', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Persona), // Convierte el objeto Duenio a JSON
      })
      .then(response => response.json())
      .then(data => {
        console.log('Persona agregada:', data);
      })
      .catch(error => {
        console.error('Error al agregar Persona:', error);
      });
    };
  
    return (
      <div>
        <h2>Agregar PERSONA</h2>
  
        {/* Campo para ingresar el DNI */}
        <div>
          <label htmlFor="documento">documento: </label>
          <input
            type="text"
            id="documento"
            value={documento}
            onChange={(e) => setDni(e.target.value)} // Actualiza el estado al cambiar el campo
          />
        </div>

        {/* Campo para ingresar el nombre */}
        <div>
          <label htmlFor="nombre">nombre: </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} // Actualiza el estado al cambiar el campo
          />
        </div>

        {/* Campo para ingresar el Usuario */}
        <div>
          <label htmlFor="nombreUser">Ingrese usuario: </label>
          <input
            type="text"
            id="nombreUser"
            value={nombreUser}
            onChange={(e) => setNombreUser(e.target.value)} // Actualiza el estado al cambiar el campo
          />
        </div>

        {/* Campo para ingresar el contraseña */}
        <div>
          <label htmlFor="contrasenia">Ingrese contraseña: </label>
          <input
            type="text"
            id="contrasenia"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)} // Actualiza el estado al cambiar el campo
          />
        </div>
  
        {/* Campo para ingresar el tipoUser */}
        <div>
          <label htmlFor="tipoUser">Tipo de Usuario: </label>
          <select
            id="tipoUser"
            value={tipoUser}
            onChange={(e) => setTipoUser(e.target.value)} // Guarda el valor seleccionado
          >
            <option value="general">General</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
  
        {/* Botón para enviar los datos */}
        <button className="btn btn-warning" onClick={agregarPersona}>Agregar Persona</button>
      </div>
    );
  
  

}

export default AddPersona;