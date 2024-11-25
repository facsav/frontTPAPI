import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const AddUnidad = () => {
    const { usuario } = useContext(AuthContext);
    const [edificio, setEdificio] = useState(null);
    const [codigoEdificio, setCodigoEdificio] = useState("");
    const [piso, setPiso] = useState("");
    const [numero, setNumero] = useState("");
    const [mensajeExito, setMensajeExito] = useState('');

    const buscarEdificio = (codigo) => {
        fetch('/edi', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const edificioEncontrado = data.find(edificio => edificio.codigo == codigo);
            if (edificioEncontrado) {
                setEdificio(edificioEncontrado);
                console.log("Edificio encontrado:", edificioEncontrado);
            } else {
                alert("Edificio no encontrado");
                setEdificio(null);
            }
        })
        .catch(error => {
            console.error('Error al buscar el edificio:', error);
            setEdificio(null);
        });
    }

    const agregarUnidad = () => {
        if (!edificio) {
            alert("Debe buscar y seleccionar un edificio válido antes de agregar una unidad.");
            return;
        }

        const Unidad = {
            piso: piso,
            numero: numero,
            habitado:  "N",
            edificio: edificio
        };

        fetch('/addUnidad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Unidad),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.text(); // Cambiado a text() para manejar respuestas en texto plano
        })
        .then(data => {
            alert('Unidad agregada con éxito');
            setMensajeExito('Unidad agregada con éxito');
            // Limpiar el formulario después de agregar la unidad
            setPiso("");
            setNumero("");
            setTimeout(() => {
                setMensajeExito('');
            }, 3000);
        })
        .catch(error => {
            console.error('Error al agregar Unidad:', error);
        });
    }

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }

    if (usuario.tipoUser !== 'administrador') {
        return <div>No tiene permisos para agregar una unidad</div>;
    }

    return (
        <>
            <h1>Ingrese el edificio al que le va a agregar una Unidad</h1>
            <input
                type="text"
                value={codigoEdificio}
                onChange={(e) => setCodigoEdificio(e.target.value)}
                placeholder="Código del edificio"
            />
            <button className="btn btn-warning" onClick={() => buscarEdificio(codigoEdificio)}>Buscar edificio</button>

            {edificio && (
                <div>
                    <h2>Edificio encontrado</h2>
                    <h1>Ingrese el edificio al que le va a agregar una Unidad</h1>

                    <div>
                        <h3>Nombre: {edificio.nombre}</h3>
                        <h3>Dirección: {edificio.direccion}</h3>
                        <h3>Código: {edificio.codigo}</h3>
                    </div>
                    
                    <div>
                        <h3>Ingrese Piso</h3>
                        <label htmlFor="piso">: </label>
                        <input
                            type="text"
                            id="piso"
                            value={piso}
                            onChange={(e) => setPiso(e.target.value)}
                        />
                        <h3>Ingrese Numero de departamento</h3>
                        <label htmlFor="numero">: </label>
                        <input
                            type="text"
                            id="numero"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </div>
                    <h3>Si desea agregar una unidad presione el botón:</h3>
                    <button className="btn btn-warning" onClick={agregarUnidad}>Agregar</button>
                    {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
                </div>
            )}
        </>
    );
}

export default AddUnidad;