import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const GetAllInquilinos = () => {
    const { usuario } = useContext(AuthContext);
    const [inquilinos, setInquilinos] = useState([]);

    useEffect(() => {
        if (usuario && usuario.tipoUser === 'administrador') {
            fetch('/inq', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setInquilinos(data);
            })
            .catch(error => {
                console.error('Error al obtener los inquilinos:', error);
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
                    <h1>Inquilinos</h1>
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
                            {inquilinos.map((inquilino, index) => (
                                <tr key={inquilino.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{inquilino.id}</td>
                                    <td>{inquilino.persona.documento}</td>
                                    <td>{inquilino.persona.nombre}</td>
                                    <td>{inquilino.unidad ? inquilino.unidad.identificador : ""}</td>
                                    <td>{inquilino.unidad ? inquilino.unidad.piso : ""}</td>
                                    <td>{inquilino.unidad ? inquilino.unidad.numero : ""}</td>
                                    <td>{inquilino.unidad ? inquilino.unidad.habitado : ""}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GetAllInquilinos;