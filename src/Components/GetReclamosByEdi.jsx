import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const GetReclamosByEdi = () => {
    const { usuario } = useContext(AuthContext);
    const [numero, setNumero] = useState('');
    const [reclamos, setReclamos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const buscarReclamos = (numero) => {
        console.log(`Buscando reclamos para el número de edificio: ${numero}`);
        fetch(`/reclamosEdi/${numero}`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0 || !data) {
                setMensaje('No existe un reclamo con ese número de edificio');
                setReclamos([]);
            } else {
                setReclamos(Array.isArray(data) ? data : [data]);
                setMensaje('');
            }
        })
        .catch(error => {
            console.error('Error al buscar los reclamos:', error);
            setMensaje('Error al buscar los reclamos');
        });
    }

    if (!usuario) {
        console.log('No hay usuario logueado');
        return <div>No hay usuario logueado</div>;
    }

    if (usuario.tipoUser !== 'administrador') {
        console.log('Usuario no tiene permisos para ver esta página');
        return <div>No tiene permisos para ver esta página</div>;
    }

    return (
        <>
            <h1>Buscar Reclamos por Número de Edificio</h1>
            <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Número de edificio"
            />
            <button className="btn btn-warning" onClick={() => buscarReclamos(numero)}>Buscar Reclamos</button>

            {mensaje && <p>{mensaje}</p>}

            {reclamos.length > 0 && (
                <div className="container">

                    <div className="departures">
                        <table className="contenido table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th id="table-title" scope="col">#</th>
                                    <th id="table-title" scope="col">ID</th>
                                    <th id="table-title" scope="col">Documento</th>
                                    <th id="table-title" scope="col">Edificio</th>
                                    <th id="table-title" scope="col">Piso</th>
                                    <th id="table-title" scope="col">Nro Depto</th>
                                    <th id="table-title" scope="col">Descripción</th>
                                    <th id="table-title" scope="col">Tipo de reclamo</th>
                                    <th id="table-title" scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody id="content">
                                {reclamos.map((reclamo, index) => (
                                    <tr >
                                        <th scope="row">-</th>
                                        <td>{reclamo.reclamoId}</td>
                                        <td>{reclamo.usuario.documento}</td>
                                        <td>{reclamo.edificio.direccion}</td>
                                        <td>{reclamo.unidad ? (reclamo.unidad.piso ? reclamo.unidad.piso : "Área común") : "-"}</td>
                                        <td>{reclamo.unidad ? (reclamo.unidad.numero ? reclamo.unidad.numero : "Área común") : "-"}</td>
                                        <td>{reclamo.descripcion}</td>
                                        <td>{reclamo.ubicacion}</td>
                                        <td>{reclamo.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default GetReclamosByEdi;