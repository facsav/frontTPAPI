import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const GetUnidad = () => {
    const { usuario } = useContext(AuthContext);
    const [idUnidad, setIdUnidad] = useState("");
    const [unidad, setUnidad] = useState(null);
    const [edificio, setEdificio] = useState(null);

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
            alert('Unidad eliminada con éxito');
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Error al eliminar la unidad');
        });
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
                buscarEdificio(idUnidad);
            } else {
                alert("Unidad no encontrada");
            }
        })
        .catch(error => {
          console.error('Error al buscar la unidad:', error);
        });
    }

    const buscarEdificio = (codigo) => {
        fetch(`/getEdiPorUni/${codigo}`, {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setEdificio(data); 
        })
        .catch(error => {
          console.error('Error al buscar el edificio:', error);
        });
    }

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }

    if (usuario.tipoUser !== 'administrador') {
        return <div>No tiene permisos para ver esta página</div>;
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
            <button className="btn btn-warning" onClick={() => buscarUnidad(idUnidad)}>Buscar unidad</button>

            {console.log(edificio)}
            {console.log(unidad)}
            {unidad && (
                <>
                <div>
                    <h1>Unidad encontrada</h1>
                    <div>
                        <h2>ID: {unidad.identificador}</h2>
                        {edificio &&(
                            <>
                            <h2>Nombre del edificio: {edificio.nombre}</h2>
                            <h2>Direccion: {edificio.direccion}</h2>
                            </>
                        )}

                        <h2>Piso: {unidad.piso}</h2>
                        <h2>Numero de departamento: {unidad.numero}</h2>
                        <h2>Habitado: {unidad.habitado}</h2>
                    </div>
                    <h3>Si desea borrarlo presione el botón:</h3>
                    <button className="btn btn-warning" onClick={() => deleteUnidad(idUnidad)}>Borrar unidad</button>
                </div>
                </>
            )}
        </>
    );
}

export default GetUnidad;