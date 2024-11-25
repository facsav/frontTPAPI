import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const AddEdificio = () => {
  const { usuario } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const agregarEdificio = () => {
    const Edificio = {
      nombre: nombre,
      direccion: direccion
    };

    fetch('/addEdificio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Edificio),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.text(); // Cambiar a response.text() para manejar respuestas de texto
    })
    .then(text => {
      console.log('Respuesta del servidor al agregar edificio:', text);
      setMensaje('Edificio agregado exitosamente');
      // Limpiar los campos después de agregar el edificio
      setNombre('');
      setDireccion('');
    })
    .catch(error => {
      console.error('Error al agregar Edificio:', error);
      setMensaje('Error al agregar el edificio');
    });
  };

  if (!usuario) {
    return <div>No hay usuario logueado</div>;
  }

  if (usuario.tipoUser !== 'administrador') {
    return <div>No tiene permisos para agregar un edificio</div>;
  }

  return (
    <div>
      <h2>Agregar Edificio</h2>
      {mensaje && <p>{mensaje}</p>}
      <div>
        <label htmlFor="nombre">Nombre del Edificio:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="direccion">Dirección del Edificio:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>
      <button className="btn btn-warning" onClick={agregarEdificio}>Agregar Edificio</button>
    </div>
  );
};

export default AddEdificio;