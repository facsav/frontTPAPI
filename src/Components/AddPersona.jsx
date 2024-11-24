import React, { useState } from 'react';

const AddPersona = () => {
    const [documento, setDocumento] = useState('');
    const [nombre, setNombre] = useState('');
    const [nombreUser, setNombreUser] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [tipoUser, setTipoUser] = useState('general'); // Valor predeterminado
    const [mensaje, setMensaje] = useState('');

    const agregarPersona = () => {
        const Persona = {
            documento: documento,
            nombre: nombre,
            nombreUser: nombreUser,
            contrasenia: contrasenia,
            tipoUser: tipoUser
        };

        console.log('Persona a agregar:', Persona); // Log de depuración

        fetch('/addPersona', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Persona),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.text().then(text => {
                return text ? JSON.parse(text) : {};
            });
        })
        .then(data => {
            console.log('Persona agregada:', data);
            setMensaje('Persona agregada exitosamente');
            // Limpiar el formulario después de agregar la persona
            setDocumento('');
            setNombre('');
            setNombreUser('');
            setContrasenia('');
            setTipoUser('general'); // Restablecer el valor predeterminado
        })
        .catch(error => {
            console.error('Error al agregar Persona:', error);
            setMensaje('Error al agregar Persona');
        });
    };

    return (
        <div>
            <h1>Agregar Persona</h1>
            <form onSubmit={(e) => { e.preventDefault(); agregarPersona(); }}>
                <div>
                    <label htmlFor="documento">Documento: </label>
                    <input
                        type="text"
                        id="documento"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="nombre">Nombre: </label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="nombreUser">Nombre de Usuario: </label>
                    <input
                        type="text"
                        id="nombreUser"
                        value={nombreUser}
                        onChange={(e) => setNombreUser(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="contrasenia">Contraseña: </label>
                    <input
                        type="password"
                        id="contrasenia"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="tipoUser">Tipo de Usuario: </label>
                    <select
                        id="tipoUser"
                        value={tipoUser}
                        onChange={(e) => setTipoUser(e.target.value)}
                    >
                        <option value="general">General</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>
                <button className="btn btn-warning" type="submit">Agregar Persona</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default AddPersona;