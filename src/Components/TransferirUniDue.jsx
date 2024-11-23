import { useState } from "react";

const TransferirUniDue = () => {
    
    const [idUnidad, setIdUnidad] = useState('');
    const [unidad, setUnidad] = useState(null);

    const [documentoDue, setDocumentoDue] = useState('');
    const [dueño, setDueño] = useState(null);

    const [documentoNuevo, setDocumentoNuevo] = useState('');
    const [nuevo, setNuevo] = useState(null);

    const [piso, setPiso] = useState('');
    const [numero, setNumero] = useState('');
    const [mensaje, setMensaje] = useState('');

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
            setUnidad(null);
        });
    }

    const buscarDueno = (documento) => {
        fetch('/due', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const dueñoEncontrado = data.find(persona => persona.documento == documento);
            if (dueñoEncontrado) {
                setDueño(dueñoEncontrado);
                console.log("Dueño encontrado:", dueñoEncontrado);
            } else {
                alert("Dueño no encontrado");
                setDueño(null);
            }
        })
        .catch(error => {
            console.error('Error al buscar el dueño:', error);
            setDueño(null);
        });
    }

    const buscarPersona = (documento) => {
        fetch('/per', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const nuevoEncontrado = data.find(persona => persona.documento == documento);
            if (nuevoEncontrado) {
                setNuevo(nuevoEncontrado);
                console.log("Nuevo dueño encontrado:", nuevoEncontrado);
            } else {
                alert("Nuevo dueño no encontrado");
                setNuevo(null);
            }
        })
        .catch(error => {
            console.error('Error al buscar el nuevo dueño:', error);
            setNuevo(null);
        });
    }

    const transferirUnidad = (piso, numero, documentoDue, documentoNuevo) => {
        fetch(`/transUnidadDuenio/${idUnidad}/${piso}/${numero}/${documentoDue}/${documentoNuevo}`, {
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
            setUnidad(null); 
        })
        .catch(error => {
            console.error('Error al hacer el swap :', error);
            setMensaje('Error al hacer el swap ');
        });
    }


    return (
        <>
            <h1>Transferir Unidad</h1>
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
                        <h3>Ingrese el documento del dueño actual</h3>
                        <label htmlFor="documentoDue">Documento Dueño Actual: </label>
                        <input
                            type="text"
                            id="documentoDue"
                            value={documentoDue}
                            onChange={(e) => setDocumentoDue(e.target.value)}
                        />
                        <button className="btn btn-warning" onClick={() => buscarDueno(documentoDue)}>Buscar dueño</button>
                    </div>
                </div>
            )}

            {dueño && (
                <div>
                    <h2>Dueño encontrado</h2>
                    <div>
                        <h3>Documento: {dueño.documento}</h3>
                        <h3>Nombre: {dueño.nombre}</h3>
                        <h3>Nombre de usuario: {dueño.nombreUser}</h3>
                        <h3>Tipo de usuario: {dueño.tipoUser}</h3>
                    </div>
                    <div>
                        <h3>Ingrese el documento del nuevo dueño</h3>
                        <label htmlFor="documentoNuevo">Documento Nuevo Dueño: </label>
                        <input
                            type="text"
                            id="documentoNuevo"
                            value={documentoNuevo}
                            onChange={(e) => setDocumentoNuevo(e.target.value)}
                        />
                        <button className="btn btn-warning" onClick={() => buscarPersona(documentoNuevo)}>Buscar persona</button>
                    </div>
                </div>
            )}

            {nuevo && (
                <div>
                    <h2>Persona encontrada</h2>
                    <div>
                        <h3>Documento: {nuevo.documento}</h3>
                        <h3>Nombre: {nuevo.nombre}</h3>
                        <h3>Nombre de usuario: {nuevo.nombreUser}</h3>
                        <h3>Tipo de usuario: {nuevo.tipoUser}</h3>
                    </div>
                    <div>
                        <h3>Ingrese el piso y número de la unidad para transferir</h3>
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
                    <h3>Si desea transferir la unidad presione el botón:</h3>
                    <button className="btn btn-warning" onClick={() => transferirUnidad(piso, numero, documentoDue, documentoNuevo)}>Transferir Unidad</button>
                </div>
            )}

            {mensaje && <p>{mensaje}</p>}
        </>
    );
}

export default TransferirUniDue;