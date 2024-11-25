import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const VerReclamosDeEdificio = () => {
    const { usuario } = useContext(AuthContext);
    const [reclamos, setReclamos] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [edificio, setEdificio] = useState(null);

    useEffect(() => {
        if (usuario) {
            verificarUsuario();
        }
    }, [usuario]);

    const verificarUsuario = () => {
        console.log('Verificando usuario:', usuario);
        fetch(`/buscarDuenio/${usuario.documento}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dueño encontrado:', data);
            if (data && data.unidad) {
                obtenerEdificio(data.unidad.identificador);
            } else {
                verificarInquilino();
            }
        })
        .catch(error => {
            console.error('Error al verificar si es dueño:', error);
            verificarInquilino();
        });
    };

    const verificarInquilino = () => {
        fetch(`/buscarInquilino/${usuario.documento}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Inquilino encontrado:', data);
            if (data && data.unidad) {
                obtenerEdificio(data.unidad.identificador);
            } else {
                setMensaje('Usted no es ni inquilino ni dueño, no puede ver reclamos');
            }
        })
        .catch(error => {
            console.error('Error al verificar si es inquilino:', error);
            setMensaje('Usted no es ni inquilino ni dueño, no puede ver reclamos');
        });
    };

    const obtenerEdificio = (identificadorUnidad) => {
        fetch(`/getEdiPorUni/${identificadorUnidad}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Edificio obtenido:', data);
            setEdificio(data);
            buscarReclamos(data.codigo);
        })
        .catch(error => {
            console.error('Error al obtener el edificio:', error);
            setMensaje('Error al obtener el edificio');
        });
    };

    const buscarReclamos = (codigoEdificio) => {
        console.log(`Buscando reclamos para el edificio con código: ${codigoEdificio}`);
        fetch(`/reclamosEdi/${codigoEdificio}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Reclamos obtenidos:', data);
            const reclamosComunes = data.filter(reclamo => reclamo.ubicacion === 'comun');
            setReclamos(reclamosComunes);
            if (reclamosComunes.length === 0) {
                setMensaje('No hay reclamos comunes para mostrar');
            } else {
                setMensaje('');
            }
        })
        .catch(error => {
            console.error('Error al buscar los reclamos:', error);
            setMensaje('Error al buscar los reclamos');
        });
    };

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }

    return (
        <div>
            <h1>Reclamos del Edificio</h1>
            {mensaje && <p>{mensaje}</p>}
            {edificio && (
                <div>
                    <h2>Edificio: {edificio.nombre}</h2>
                    <h3>Dirección: {edificio.direccion}</h3>
                </div>
            )}
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
        </div>
    );
};

export default VerReclamosDeEdificio;