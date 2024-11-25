import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const CambiarEstado = () => {
    const { usuario } = useContext(AuthContext);
    const [codigoReclamo, setCodigoReclamo] = useState('');
    const [reclamo, setReclamo] = useState(null);
    const [nuevoEstado, setNuevoEstado] = useState('');
    const [mensaje, setMensaje] = useState('');

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }

    if (usuario.tipoUser !== 'administrador') {
        return <div>No tiene permisos para cambiar el estado de un reclamo</div>;
    }

    const buscarReclamo = () => {
        console.log(`Buscando reclamo con código: ${codigoReclamo}`);
        fetch('http://localhost:8080/reclamos', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor al buscar reclamo:', data);
            const reclamoEncontrado = data.find(reclamo => reclamo.reclamoId == codigoReclamo);
            if (reclamoEncontrado) {
                setReclamo(reclamoEncontrado);
                setMensaje('');
            } else {
                setMensaje('No se encontró el reclamo');
                setReclamo(null);
            }
        })
        .catch(error => {
            console.error('Error al buscar el reclamo:', error);
            setMensaje('Error al buscar el reclamo');
            setReclamo(null);
        });
    };

    const cambiarEstado = () => {
        if (reclamo.estado === 'cerrado' || reclamo.estado === 'terminado') {
            alert(`El estado ya está en ${reclamo.estado}`);
            return;
        }

        if (!nuevoEstado) {
            alert('El nuevo estado no puede estar vacío');
            return;
        }

        console.log(`Cambiando estado del reclamo con ID: ${reclamo.reclamoId} a ${nuevoEstado}`);
        fetch(`/cambiarEstado/${reclamo.reclamoId}/${nuevoEstado}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.text(); // Cambiar a response.text() para manejar respuestas de texto
        })
        .then(text => {
            console.log('Respuesta del servidor al cambiar estado:', text);
            setMensaje('Estado cambiado exitosamente');
            // Restablecer los estados a sus valores iniciales
            setCodigoReclamo('');
            setReclamo(null);
            setNuevoEstado('');
        })
        .catch(error => {
            console.error('Error al cambiar el estado:', error);
            setMensaje('Error al cambiar el estado');
        });
    };

    return (
        <div>
            <h1>Cambiar Estado del Reclamo</h1>
            <div>
                <label htmlFor="codigoReclamo">Código del Reclamo: </label>
                <input
                    type="text"
                    id="codigoReclamo"
                    value={codigoReclamo}
                    onChange={(e) => setCodigoReclamo(e.target.value)}
                />
                <button className="btn btn-warning" onClick={buscarReclamo}>Buscar Reclamo</button>
            </div>
            {mensaje && <p>{mensaje}</p>}
            {reclamo && (
                <div>
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
                            <tr>
                                <th scope="row">-</th>
                                <td>{reclamo.reclamoId}</td>
                                <td>{reclamo.usuario.documento}</td>
                                <td>{reclamo.edificio.direccion}</td>
                                <td>{reclamo.unidad ? reclamo.unidad.piso : "Área común"}</td>
                                <td>{reclamo.unidad ? reclamo.unidad.numero : "Área común"}</td>
                                <td>{reclamo.descripcion}</td>
                                <td>{reclamo.ubicacion}</td>
                                <td>{reclamo.fecha}</td>
                                <td>{reclamo.estado}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <label htmlFor="nuevoEstado">Nuevo Estado: </label>
                        <input
                            type="text"
                            id="nuevoEstado"
                            value={nuevoEstado}
                            onChange={(e) => setNuevoEstado(e.target.value)}
                        />
                        <button className="btn btn-warning" onClick={cambiarEstado}>Aplicar Estado Nuevo</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CambiarEstado;