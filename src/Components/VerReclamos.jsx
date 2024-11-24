import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const VerReclamos = () => {
    const { usuario } = useContext(AuthContext);
    const [reclamos, setReclamos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const buscarReclamos = () => {
        if (usuario) {
            fetch(`/reclamosPersona/${usuario.documento}`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setReclamos(data);
                if (data.length === 0) {
                    setMensaje('No hay reclamos para mostrar');
                } else {
                    setMensaje('');
                }
            })
            .catch(error => {
                console.error('Error al buscar los reclamos:', error);
                setMensaje('Error al buscar los reclamos');
            });
        }
    };

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }

    console.log("Usuario logueado:", usuario);

    return (
        <div>
            <h1>Reclamos del Usuario</h1>
            <p>Nombre: {usuario.nombre}</p>
            <p>DNI: {usuario.documento}</p>
            {/* <p>Tipo de Usuario: {usuario.tipoUser}</p> */}
            <button className="btn btn-warning" onClick={buscarReclamos}>Buscar Reclamos</button>
            <h2>Lista de Reclamos</h2>
            {mensaje && <p>{mensaje}</p>}
            {reclamos.length > 0 && (
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
                                <th id="table-title" scope="col">Fecha</th>
                                <th id="table-title" scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody id="content">
                            {reclamos.map((reclamo, index) => (
                                <tr /*key={reclamo.id}*/>
                                    <th scope="row">-</th>
                                    <td>{reclamo.reclamoId}</td>
                                    <td>{reclamo.usuario.documento}</td>
                                    <td>{reclamo.edificio.direccion}</td>
                                    <td>{reclamo.unidad ? (reclamo.unidad.piso ? reclamo.unidad.piso : "Área común") : "-"}</td>
                                    <td>{reclamo.unidad ? (reclamo.unidad.numero ? reclamo.unidad.numero : "Área común") : "-"}</td>
                                    <td>{reclamo.descripcion}</td>
                                    <td>{reclamo.ubicacion}</td>
                                    <td>{reclamo.fecha}</td>
                                    <td>{reclamo.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default VerReclamos;



