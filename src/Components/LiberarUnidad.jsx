import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const LiberarUnidad = () => {
    const { usuario } = useContext(AuthContext);
    const [idUnidad, setIdUnidad] = useState('');
    const [piso, setPiso] = useState('');
    const [numero, setNumero] = useState('');
    const [unidad, setUnidad] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const liberarUnidad = (codigo, piso, numero) => {
        fetch(`/liberarUni/${codigo}/${piso}/${numero}`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.text();
        })
        .then(data => {
            setMensaje(data);
            setUnidad(null); // Limpiar el estado de la unidad después de liberarla
        })
        .catch(error => {
            console.error('Error al liberar la unidad:', error);
            setMensaje('Error al liberar la unidad');
        });
    }

    const buscarUnidad = (codigo) => {
        fetch('/uni', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const unidadEncontrada = data.find(unidad => unidad.identificador == codigo && unidad.habitado == "S");
            if (unidadEncontrada) {
                setUnidad(unidadEncontrada);
                console.log("Unidad encontrada:", unidadEncontrada);
            } else {
                alert("Unidad no encontrada o no válida para liberar");
                setUnidad(null);
            }
        })
        .catch(error => {
            console.error('Error al buscar la unidad:', error);
            setUnidad(null);
        });
    }

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }

    if (usuario.tipoUser !== 'administrador') {
        return <div>No tiene permisos para liberar una unidad</div>;
    }

    return (
        <>
            <h1>Liberar Unidad</h1>
            <input
                type="text"
                value={idUnidad}
                onChange={(e) => setIdUnidad(e.target.value)}
                placeholder="ID de la unidad"
            />
            <button className="btn btn-warning" onClick={() => buscarUnidad(idUnidad)}>Buscar unidad</button>

            {unidad && (
                <div>
                    <h2>Unidad encontrada</h2>
                    <div>
                        <h3>ID: {unidad.identificador}</h3>
                        <h3>Piso: {unidad.piso}</h3>
                        <h3>Número de departamento: {unidad.numero}</h3>
                        <h3>Habitado: {unidad.habitado}</h3>
                    </div>
                    <div>
                        <h3>Ingrese el piso y número de la unidad para liberar</h3>
                        <label htmlFor="piso">Piso: </label>
                        <input
                            type="text"
                            id="piso"
                            value={piso}
                            onChange={(e) => setPiso(e.target.value)}
                        />
                        <label htmlFor="numero">Número: </label>
                        <input
                            type="text"
                            id="numero"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </div>
                    <h3>Si desea liberar la unidad presione el botón:</h3>
                    <button className="btn btn-warning" onClick={() => liberarUnidad(idUnidad, piso, numero)}>Liberar Unidad</button>
                </div>
            )}

            {mensaje && <p>{mensaje}</p>}
        </>
    );
}

export default LiberarUnidad;