import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const GetPersona = () => {
    const { usuario } = useContext(AuthContext);
    const [documento, setDocumento] = useState("");
    const [persona, setPersona] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const deletePersona = (documento) => {
        fetch(`/removePersona/${documento}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                alert("Error al eliminar la persona, es probable que el Documento ingresado sea Incorrecto, Pruebe otra vez");
                throw new Error("Error al eliminar la persona, es probable que el Documento ingresado sea Incorrecto, Pruebe otra vez");
            }
            return response.text(); // Cambiado a text() ya que el método Java devuelve un String
        })
        .then(message => {
            console.log(message);
            setMensaje('Persona eliminada exitosamente');
            setPersona(null); // Limpiar el estado de persona después de eliminarlo
        })
        .catch(err => {
            console.error('Error:', err);
            setMensaje('Error al eliminar la persona');
        });
    }

    const buscarPersona = (documento) => {
        fetch('/per', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const personaEncontrada = data.find(persona => persona.documento == documento);
            if (personaEncontrada) {
                setPersona(personaEncontrada);
            } else {
                alert("Persona no encontrada");
            }
        })
        .catch(error => {
          console.error('Error al buscar la persona:', error);
        });
    }

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }

    if (usuario.tipoUser !== 'administrador') {
        return <div>No tiene permisos para ver esta página</div>;
    }

    return (
        <>
            <h1>Buscar Persona</h1>
            {mensaje && <p>{mensaje}</p>}
            <input
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                placeholder="Ingrese el Documento de la Persona"
            />
            <button onClick={() => buscarPersona(documento)}>Buscar</button>
            {persona && (
                <div>
                    <h2>Persona Encontrada</h2>
                    <p>Documento: {persona.documento}</p>
                    <p>Nombre: {persona.nombre}</p>
                    <p>Nombre de Usuario: {persona.nombreUser}</p>
                    <p>Tipo de Usuario: {persona.tipoUser}</p>
                    <button onClick={() => deletePersona(persona.documento)}>Eliminar Persona</button>
                </div>
            )}
        </>
    );
};

export default GetPersona;