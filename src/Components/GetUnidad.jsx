import React, { useState} from 'react';

const GetUnidad = () => {
    const [idUnidad, setIdUnidad] = useState("");
    const [unidad, setUnidad] = useState(null);

    const deleteUnidad = (codigo) => {
        fetch(`/removeUnidad/${codigo}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                alert("Error al eliminar unidad, es probable que el ID ingresado sea Incorrecto, Pruebe otra vez");
                throw new Error('Error al eliminar unidad, es probable que el ID ingresado sea Incorrecto, Pruebe otra vez');
            }
            return response.text(); // Cambiado a text() ya que el método Java devuelve un String
        })
        .then(message => {
            setUnidad(null); // Limpiar el estado de la unidad después de eliminarla
        })
        .catch(err => console.error('Error:', err));
    }

    const buscarUnidad = (codigo) => {
        fetch('/uni', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const unidadEncontrada = data.find(unidad => unidad.identificador == codigo);
            if (unidadEncontrada) {
                setUnidad(unidadEncontrada);
            } else {
                alert("Unidad no encontrada");
            }
        })
        .catch(error => {
          console.error('Error al buscar la unidad:', error);
        });
    }


    return (
        <>
            <h1>Buscar Unidad</h1>
            <input
                type="text"
                value={idUnidad}
                onChange={(e) => setIdUnidad(e.target.value)}
                placeholder="Id de la unidad"
            />
            <button onClick={() => buscarUnidad(idUnidad)}>Buscar unidad</button>

            {unidad && (
                <>
                {console.log(unidad)}
                {(() => {
                    const prototype = Object.getPrototypeOf(unidad);
                    console.log(prototype.Object);  // Mostraría el prototipo, que generalmente es el objeto 'Object'
                })()}
                <div>
                    <h1>Unidad encontrada</h1>
                    <div>
                        <h2>ID: {unidad.identificador}</h2>
                        {/* <h2>Edificio: {unidad.codigo}</h2> */}
                        <h2>Piso: {unidad.piso}</h2>
                        <h2>Numero de departamento: {unidad.nuemro}</h2>
                        <h2>Habitado: {unidad.habitado}</h2>
                    </div>
                    <h3>Si desea borrarlo presione el botón:</h3>
                    <button onClick={() => deleteUnidad(idUnidad)}>Borrar edificio</button>
                </div>
                </>
            )}
        </>
    );
}

export default GetUnidad;