import { useState } from "react";

const AddUnidad = () => {
    const [edificio, setEdificio] = useState(null);
    const [codigoEdificio, setCodigoEdificio] = useState("");
    const [piso, setPiso] = useState("");
    const [numero, setNumero] = useState("");

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
        .then(response => response.json())
        .then(data => {
            console.log('Unidad agregada:', data);
            // Limpiar el formulario después de agregar la unidad
            setPiso("");
            setNumero("");
        })
        .catch(error => {
            console.error('Error al agregar Unidad:', error);
        });
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
            <button onClick={() => buscarEdificio(codigoEdificio)}>Buscar edificio</button>

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
                    <button onClick={agregarUnidad}>Agregar</button>
                </div>
            )}
        </>
    );
}

export default AddUnidad;