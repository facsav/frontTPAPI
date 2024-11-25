import React, { useState } from "react";

const TransferirUniDue = () => {
    const [codigoUnidad, setCodigoUnidad] = useState('');
    const [unidad, setUnidad] = useState(null);
    const [dueños, setDueños] = useState([]);
    const [dniDueñoActual, setDniDueñoActual] = useState('');
    const [dniNuevoDueño, setDniNuevoDueño] = useState('');
    const [mensaje, setMensaje] = useState('');

    const buscarUnidad = (codigo) => {
        console.log(`Buscando unidad con código: ${codigo}`);
        fetch('/uni', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const unidadEncontrada = data.find(unidad => unidad.identificador == codigo);
            if (unidadEncontrada) {
                setUnidad(unidadEncontrada);
                console.log("Unidad encontrada:", unidadEncontrada);
                encontrarDuenios(unidadEncontrada.identificador, unidadEncontrada.piso, unidadEncontrada.numero);
            } else {
                alert("Unidad no encontrada");
                setUnidad(null);
            }
        })
        .catch(error => {
            console.error('Error al buscar la unidad:', error);
            setUnidad(null);
        });
    };

    const encontrarDuenios = (id, piso, numero) => {
        console.log(`Buscando dueños para la unidad con ID: ${id}, Piso: ${piso}, Número: ${numero}`);
        fetch(`/dueniosUni/${id}/${piso}/${numero}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                console.log('Dueños encontrados:', data);
                setDueños(data);
            } else {
                console.error('Respuesta inesperada del servidor:', data);
                setDueños([]);
            }
        })
        .catch(error => {
            console.error('Error al buscar los dueños:', error);
            setDueños([]);
        });
    };

    const validarDueñoActual = () => {
        console.log(`Validando dueño actual con DNI: ${dniDueñoActual}`);
        return fetch(`/due`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const dueñoValido = data.find(dueño => dueño.persona.documento === dniDueñoActual && dueño.unidad.identificador === unidad.identificador);
            if (dueñoValido) {
                console.log("Dueño actual validado:", dueñoValido);
                return true;
            } else {
                alert("Dueño actual no válido");
                return false;
            }
        })
        .catch(error => {
            console.error('Error al validar el dueño actual:', error);
            return false;
        });
    };

    const transferirUnidad = () => {
        console.log(`Iniciando transferencia de unidad con ID: ${unidad.identificador}`);
        validarDueñoActual().then((esValido) => {
            if (!esValido) {
                return;
            }

            const url = `/transUnidadDuenio/${unidad.identificador}/${unidad.piso}/${unidad.numero}/${dniDueñoActual}/${dniNuevoDueño}`;
            console.log(`Realizando transferencia a nuevo dueño con URL: ${url}`);
            fetch(url, {
                method: 'GET',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.text(); // Cambiar a response.text() para manejar respuestas de texto
            })
            .then(text => {
                console.log('Respuesta del servidor al realizar la transferencia:', text);
                setMensaje('Transferencia realizada exitosamente');

                setCodigoUnidad('');
                setUnidad(null);
                setDueños([]);
                setDniDueñoActual('');
                setDniNuevoDueño('');
            })
            .catch(error => {
                console.error('Error al realizar la transferencia:', error);
                setMensaje('Error al realizar la transferencia');
            });
        });
    };

    return (
        <div>
            <h1>Transferir Unidad a Dueño</h1>
            <div>
                <label htmlFor="codigoUnidad">Código de la Unidad: </label>
                <input
                    type="text"
                    id="codigoUnidad"
                    value={codigoUnidad}
                    onChange={(e) => setCodigoUnidad(e.target.value)}
                />
                <button className="btn btn-warning" onClick={() => buscarUnidad(codigoUnidad)}>Buscar Unidad</button>
            </div>
            {mensaje && <p>{mensaje}</p>}
            {unidad && (
                <div>
                    <h2>Unidad encontrada</h2>
                    <p>ID: {unidad.identificador}</p>
                    <p>Piso: {unidad.piso}</p>
                    <p>Número: {unidad.numero}</p>
                    <h3>Dueños</h3>
                    <ul>
                        {dueños.map((dueño, index) => (
                            <li key={index}>{dueño.persona.nombre}</li>
                        ))}
                    </ul>
                    <div>
                        <label htmlFor="dniDueñoActual">DNI del Dueño Actual: </label>
                        <input
                            type="text"
                            id="dniDueñoActual"
                            value={dniDueñoActual}
                            onChange={(e) => setDniDueñoActual(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="dniNuevoDueño">DNI del Nuevo Dueño: </label>
                        <input
                            type="text"
                            id="dniNuevoDueño"
                            value={dniNuevoDueño}
                            onChange={(e) => setDniNuevoDueño(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-warning" onClick={transferirUnidad}>Hacer Cambio de Dueño</button>
                </div>
            )}
        </div>
    );
};

export default TransferirUniDue;