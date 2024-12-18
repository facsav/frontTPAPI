import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const AddReclamo = () => {
    const { usuario } = useContext(AuthContext);
    const [codigoEdificio, setCodigoEdificio] = useState('');
    const [edificio, setEdificio] = useState(null);
    const [habilitado, setHabilitado] = useState(false);
    const [tipoReclamo, setTipoReclamo] = useState('comun'); // Valor predeterminado
    const [ubicacion, setUbicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idUnidad, setIdUnidad] = useState('');
    const [unidad, setUnidad] = useState(null);
    const [mensaje, setMensaje] = useState('');

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }

    if (usuario.tipoUser !== 'general') {
        return <div>No tiene permisos para hacer un reclamo</div>;
    }

    const buscarEdificio = (codigo) => {
        fetch(`/edi`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const edificioEncontrado = data.find(edificio => edificio.codigo == codigo);
            if (edificioEncontrado) {
                verificarHabilitacionEdificio(edificioEncontrado);
            } else {
                alert("Edificio no encontrado");
                setEdificio(null);
            }
        })
        .catch(error => {
            console.error('Error al buscar el edificio:', error);
            setEdificio(null);
        });
    };

    const verificarHabilitacionEdificio = (edificio) => {
        fetch(`/habilitadosEdi/${edificio.codigo}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const habilitado = data.some(persona => persona.nombre === usuario.documento);
            if (habilitado) {
                setEdificio(edificio);
                setHabilitado(true);
                console.log("Usuario habilitado para hacer reclamos en el edificio:", edificio);
            } else {
                alert("No tiene permisos para hacer un reclamo en este edificio");
                setEdificio(null);
                setHabilitado(false);
            }
        })
        .catch(error => {
            console.error('Error al verificar habilitación del edificio:', error);
            setEdificio(null);
            setHabilitado(false);
        });
    };

    const buscarUnidad = (codigo) => {
        fetch('/uni', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const unidadEncontrada = data.find(unidad => unidad.identificador == codigo);
            if (unidadEncontrada) {
                setUnidad(unidadEncontrada);
                console.log("Unidad encontrada:", unidadEncontrada);
            } else {
                alert("Unidad no encontrada");
                setUnidad(null);
            }
        })
        .catch(error => {
            console.error('Error al buscar la unidad:', error);
        });
    };

    const verificarInquilinoODueno = (unidad) => {
        return fetch(`/inquilinosUni/${unidad.identificador}/${unidad.piso}/${unidad.numero}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Respuesta inesperada del servidor');
            }
            if (data.length > 0) {
                const inquilinoEncontrado = data.find(inquilino => inquilino.persona.documento === usuario.documento);
                if (inquilinoEncontrado) {
                    console.log("Usuario es inquilino de la unidad");
                    return true;
                } else {
                    alert("No tiene permisos para hacer un reclamo en esta unidad");
                    return false;
                }
            } else {
                return verificarDueno(unidad);
            }
        })
        .catch(error => {
            console.error('Error al verificar inquilinos:', error);
            return false;
        });
    };

    const verificarDueno = (unidad) => {
        return fetch(`/dueniosUni/${unidad.identificador}/${unidad.piso}/${unidad.numero}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Respuesta inesperada del servidor');
            }
            const duenoEncontrado = data.find(dueno => dueno.persona.documento === usuario.documento);
            if (duenoEncontrado) {
                console.log("Usuario es dueño de la unidad");
                return true;
            } else {
                alert("No tiene permisos para hacer un reclamo en esta unidad");
                return false;
            }
        })
        .catch(error => {
            console.error('Error al verificar dueños:', error);
            return false;
        });
    };

    const agregarReclamo = () => {
        if (tipoReclamo === 'unidad' && unidad) {
            verificarInquilinoODueno(unidad).then((tienePermiso) => {
                if (!tienePermiso) {
                    return;
                }

                const reclamo = {
                    usuario: {
                        documento: usuario.documento
                    },
                    edificio: {
                        codigo: parseInt(codigoEdificio)
                    },
                    tipoReclamo: tipoReclamo,
                    descripcion: descripcion,
                    estado: "nuevo",
                    unidad: {
                        identificador: parseInt(idUnidad)
                    }
                };

                fetch('/addReclamo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reclamo),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
                    return response.text(); 
                })
                .then(text => {
                    console.log('Respuesta del servidor al agregar reclamo:', text);
                    setMensaje('Reclamo agregado exitosamente');
                    setCodigoEdificio('');
                    setUbicacion('');
                    setDescripcion('');
                    setIdUnidad('');
                    setTipoReclamo('comun'); 
                    setEdificio(null);
                    setUnidad(null);
                    setHabilitado(false);
                })
                .catch(error => {
                    console.error('Error al agregar Reclamo:', error);
                    setMensaje('Error al agregar Reclamo');
                });
            });
        } else {
            const reclamo = {
                usuario: {
                    documento: usuario.documento
                },
                edificio: {
                    codigo: parseInt(codigoEdificio)
                },
                tipoReclamo: tipoReclamo,
                descripcion: descripcion,
                estado: "nuevo",
                unidad: null
            };


            fetch('/addReclamo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reclamo),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.text(); 
            })
            .then(text => {
                console.log('Respuesta del servidor al agregar reclamo:', text);
                setMensaje('Reclamo agregado exitosamente');

                setCodigoEdificio('');
                setUbicacion('');
                setDescripcion('');
                setIdUnidad('');
                setTipoReclamo('comun'); 
                setEdificio(null);
                setUnidad(null);
                setHabilitado(false);
            })
            .catch(error => {
                console.error('Error al agregar Reclamo:', error);
                setMensaje('Error al agregar Reclamo');
            });
        }
    };

    return (
        <div>
            <h1>Agregar Reclamo</h1>
            <div>
                <label htmlFor="codigoEdificio">Código del Edificio: </label>
                <input
                    type="text"
                    id="codigoEdificio"
                    value={codigoEdificio}
                    onChange={(e) => setCodigoEdificio(e.target.value)}
                />
                <button className="btn btn-warning" onClick={() => buscarEdificio(codigoEdificio)}>Buscar Edificio</button>
            </div>
            {mensaje && <p>{mensaje}</p>}
            {edificio && (
                <div>
                    <h2>Edificio encontrado: {edificio.nombre}</h2>
                    {habilitado && (
                        <>
                            <div>
                                <label htmlFor="descripcion">Descripción: </label>
                                <input
                                    type="text"
                                    id="descripcion"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="tipoReclamo">Tipo de Reclamo: </label>
                                <select
                                    id="tipoReclamo"
                                    value={tipoReclamo}
                                    onChange={(e) => setTipoReclamo(e.target.value)}
                                >
                                    <option value="comun">Área Común</option>
                                    <option value="unidad">Unidad</option>
                                </select>
                            </div>
                            {tipoReclamo === 'unidad' && (
                                <div>
                                    <label htmlFor="idUnidad">ID de la Unidad: </label>
                                    <input
                                        type="text"
                                        id="idUnidad"
                                        value={idUnidad}
                                        onChange={(e) => setIdUnidad(e.target.value)}
                                    />
                                    <button className="btn btn-warning" onClick={() => buscarUnidad(idUnidad)}>Buscar Unidad</button>
                                </div>
                            )}
                            <button className="btn btn-warning" onClick={agregarReclamo}>Agregar Reclamo</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddReclamo;