import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const GetAllUnidades = () => {
    const { usuario } = useContext(AuthContext);
    const [unidades, setUnidades] = useState([]);

    useEffect(() => {
        if (usuario && usuario.tipoUser === 'administrador') {
            fetch('/uni', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setUnidades(data);
            })
            .catch(error => {
                console.error('Error al obtener las unidades:', error);
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
                    <h1>Unidades</h1>
                    <table className="contenido table table-dark table-striped">
                        <thead>
                            <tr>
                                <th id="table-title" scope="col">#</th>
                                <th id="table-title" scope="col">Identificador</th>
                                <th id="table-title" scope="col">Piso</th>
                                <th id="table-title" scope="col">Número de departamento</th>
                                <th id="table-title" scope="col">Habitado</th>
                            </tr>
                        </thead>
                        <tbody id="content">
                            {unidades.map((unidad, index) => (
                                <tr>
                                    <th scope="row">-</th>
                                    <td>{unidad.identificador}</td>
                                    <td>{unidad.piso}</td>
                                    <td>{unidad.numero}</td>
                                    <td>{unidad.habitado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GetAllUnidades;