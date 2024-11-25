import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const GetAllDuenios = () => {
    const { usuario } = useContext(AuthContext);
    const [duenios, setDuenios] = useState([]);

    useEffect(() => {
        if (usuario && usuario.tipoUser === 'administrador') {
            fetch('/due', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setDuenios(data);
            })
            .catch(error => {
                console.error('Error al obtener los dueños:', error);
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
                    <h1>Dueños</h1>
                    <table className="contenido table table-dark table-striped">
                        <thead>
                            <tr>
                                <th id="table-title" scope="col">#</th>
                                <th id="table-title" scope="col">ID</th>
                                <th id="table-title" scope="col">Documento</th>
                                <th id="table-title" scope="col">Nombre</th>
                                <th id="table-title" scope="col">Unidad</th>
                                <th id="table-title" scope="col">Piso</th>
                                <th id="table-title" scope="col">Número</th>
                                <th id="table-title" scope="col">Habitado</th>
                            </tr>
                        </thead>
                        <tbody id="content">
                            {duenios.map((duenio, index) => (
                                <tr key={duenio.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{duenio.id}</td>
                                    <td>{duenio.persona.documento}</td>
                                    <td>{duenio.persona.nombre}</td>
                                    <td>{duenio.unidad ? duenio.unidad.identificador : ""}</td>
                                    <td>{duenio.unidad ? duenio.unidad.piso : ""}</td>
                                    <td>{duenio.unidad ? duenio.unidad.numero : ""}</td>
                                    <td>{duenio.unidad ? duenio.unidad.habitado : ""}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GetAllDuenios;