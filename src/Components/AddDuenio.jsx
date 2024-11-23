import React, { useState } from 'react';

const AddDuenio = () => {
    const [idUnidad, setIdUnidad] = useState('');
    const [unidad, setUnidad] = useState(null);
    const [documento, setDocumento] = useState('');
    const [persona, setPersona] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const buscarUnidad = (codigo) => {
        fetch('/uni', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const unidadEncontrada = data.find(unidad => unidad.identificador == codigo);
            if (unidadEncontrada) {
                setUnidad(unidadEncontrada);
                console.log("Unidad encontrada:", unidadEncontrada);
            } else {
                alert("Unidad no encontrada");
                setUnidad(null);
            }
        })
        .catch(error => {
            console.error('Error al buscar la unidad:', error);
            setUnidad(null);
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
                console.log("Persona encontrada:", personaEncontrada);
            } else {
                alert("Persona no encontrada");
                setPersona(null);
            }
        })
        .catch(error => {
            console.error('Error al buscar la persona:', error);
            setPersona(null);
        });
    }

    const agregarDuenio = () => {
        if (!unidad || !persona) {
            alert("Debe buscar y seleccionar una unidad y una persona válidas antes de agregar un dueño.");
            return;
        }

        const duenioData = {
            unidad: {
                identificador: unidad.identificador
            },
            documento: documento,
            persona: persona
        };

        console.log('Datos del dueño a agregar:', duenioData); // Log de depuración

        fetch('/addDuenio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(duenioData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dueño agregado:', data);
            setMensaje('Dueño agregado exitosamente');
            // Limpiar el formulario después de agregar el dueño
            setIdUnidad('');
            setUnidad(null);
            setDocumento('');
            setPersona(null);
        })
        .catch(error => {
            console.error('Error al agregar dueño:', error);
            setMensaje('Error al agregar dueño');
        });
    }

    return (
        <>
            <h1>Agregar Dueño</h1>
            <input
                type="text"
                value={idUnidad}
                onChange={(e) => setIdUnidad(e.target.value)}
                placeholder="ID de la unidad"
            />
            <button className="btn btn-warning" onClick={() => buscarUnidad(idUnidad)}>Buscar unidad</button>

            {unidad && (
                <div>
                    <h2>Unidad encontrada</h2>
                    <div>
                        <h3>ID: {unidad.identificador}</h3>
                        <h3>Piso: {unidad.piso}</h3>
                        <h3>Número de departamento: {unidad.numero}</h3>
                        <h3>Habitado: {unidad.habitado}</h3>
                    </div>
                    <div>
                        <h3>Ingrese el documento del dueño</h3>
                        <label htmlFor="documento">: </label>
                        <input
                            type="text"
                            id="documento"
                            value={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                        />
                        <button className="btn btn-warning" onClick={() => buscarPersona(documento)}>Buscar persona</button>
                    </div>
                </div>
            )}

            {persona && (
                <div>
                    <h2>Persona encontrada</h2>
                    <div>
                        <h3>Documento: {persona.documento}</h3>
                        <h3>Nombre: {persona.nombre}</h3>
                        <h3>Nombre de usuario: {persona.nombreUser}</h3>
                        <h3>Tipo de usuario: {persona.tipoUser}</h3>
                    </div>
                    <h3>Si desea agregar un dueño presione el botón:</h3>
                    <button className="btn btn-warning" onClick={agregarDuenio}>Agregar Dueño</button>
                </div>
            )}

            {mensaje && <p>{mensaje}</p>}
        </>
    );
}

export default AddDuenio;