import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const GetAllPersonas = () => {
    const { usuario } = useContext(AuthContext);
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        if (usuario && usuario.tipoUser === 'administrador') {
            fetch('/per', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setPersonas(data);
            })
            .catch(error => {
                console.error('Error al obtener las personas:', error);
            });
        }
    }, [usuario]);

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }

    if (usuario.tipoUser !== 'administrador') {
        return <div>No tiene permisos para ver esta página</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="departures">
                    <h1>Personas</h1>
                    <table className="contenido table table-dark table-striped">
                        <thead>
                            <tr>
                                <th id="table-title" scope="col">#</th>
                                <th id="table-title" scope="col">Documento</th>
                                <th id="table-title" scope="col">Nombre</th>
                                <th id="table-title" scope="col">Nombre de Usuario</th>
                                <th id="table-title" scope="col">Contraseña</th>
                                <th id="table-title" scope="col">Tipo de Usuario</th>
                            </tr>
                        </thead>
                        <tbody id="content">
                            {personas.map((persona, index) => (
                                <tr key={persona.documento}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{persona.documento}</td>
                                    <td>{persona.nombre}</td>
                                    <td>{persona.nombreUser}</td>
                                    <td>{persona.contrasenia}</td>
                                    <td>{persona.tipoUser}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GetAllPersonas;