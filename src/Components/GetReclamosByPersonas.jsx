import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const GetReclamosByPersona = () => {
    const { usuario } = useContext(AuthContext);
    const [documento, setDocumento] = useState('');
    const [persona, setPersona] = useState(null);
    const [reclamos, setReclamos] = useState([]);

    const buscarPersona = (documento) => {
        fetch('/per', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const personaEncontrada = data.find(persona => persona.documento == documento);
            if (personaEncontrada) {
                setPersona(personaEncontrada);
                buscarReclamos(documento);
            } else {
                alert("Persona no encontrada");
            }
        })
        .catch(error => {
            console.error('Error al buscar la persona:', error);
        });
    }

    const buscarReclamos = (documento) => {
        fetch(`/reclamosPersona/${documento}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setReclamos(data);
        })
        .catch(error => {
            console.error('Error al buscar los reclamos:', error);
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
            <h1>Buscar Reclamos por Persona</h1>
            <input
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                placeholder="Documento de la persona"
            />
            <button className="btn btn-warning" onClick={() => buscarPersona(documento)}>Buscar Persona</button>

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
                                    <tr key={index}>
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

export default GetReclamosByPersona;