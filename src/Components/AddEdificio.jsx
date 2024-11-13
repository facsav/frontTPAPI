import React, { useState } from 'react';

const AddEdificio = () => {

    // Definir estados para los campos de nombre e identificador
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');

  // Función para manejar el envío de datos
  const agregarEdificio = () => {
    const Edificio = {
      nombre: nombre, // Nombre del dueño
      direccion: direccion
    };

    fetch('http://localhost:8080/addEdificio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Edificio), // Convierte el objeto Duenio a JSON
    })
    .then(response => response.json())
    .then(data => {
      console.log('Edificio agregado:', data);
    })
    .catch(error => {
      console.error('Error al agregar Edificio:', error);
    });
  };

  return (
    <div>
      <h2>Agregar Edificio</h2>

      {/* Campo para ingresar el nombre del dueño */}
      <div>
        <label htmlFor="nombre">Nombre del Edificio: </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} // Actualiza el estado al cambiar el campo
        />
      </div>

      {/* Campo para ingresar el identificador de la unidad */}
      <div>
        <label htmlFor="direccion">Direccion del Edificio: </label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)} // Actualiza el estado al cambiar el campo
        />
      </div>

      {/* Botón para enviar los datos */}
      <button onClick={agregarEdificio}>Agregar Edificio</button>
    </div>
  );



}

export default AddEdificio;