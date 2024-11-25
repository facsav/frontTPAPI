import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const GetEdificio = () => {
    const { usuario } = useContext(AuthContext);
    const [idEdificio, setIdEdificio] = useState("");
    const [edificio, setEdificio] = useState(null);
    const [mensaje, setMensaje] = useState('');

    const deleteEdifico = (codigo) => {
        fetch(`/removeEdificio/${codigo}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                alert("Error al eliminar el edificio, es probable que el ID ingresado sea Incorrecto, Pruebe otra vez");
                throw new Error('Error al eliminar el edificio, es probable que el ID ingresado sea Incorrecto, Pruebe otra vez');
            }
            return response.text(); // Cambiado a text() ya que el método Java devuelve un String
        })
        .then(message => {
            console.log(message);
            setMensaje('Edificio eliminado exitosamente');
            setEdificio(null); // Limpiar el estado del edificio después de eliminarlo
        })
        .catch(err => {
            console.error('Error:', err);
            setMensaje('Error al eliminar el edificio');
        });
    }

    const buscarEdificio = (codigo) => {
        fetch('/edi', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const edificioEncontrado = data.find(edificio => edificio.codigo == codigo);
            if (edificioEncontrado) {
                setEdificio(edificioEncontrado);
            } else {
                alert("Edificio no encontrado");
            }
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
            <h1>Buscar Edificio</h1>
            {mensaje && <p>{mensaje}</p>}
            <input
                type="text"
                value={idEdificio}
                onChange={(e) => setIdEdificio(e.target.value)}
                placeholder="Ingrese el ID del Edificio"
            />
            <button onClick={() => buscarEdificio(idEdificio)}>Buscar</button>
            {edificio && (
                <div>
                    <h2>Edificio Encontrado</h2>
                    <p>ID: {edificio.codigo}</p>
                    <p>Nombre: {edificio.nombre}</p>
                    <p>Dirección: {edificio.direccion}</p>
                    <button onClick={() => deleteEdifico(edificio.codigo)}>Eliminar Edificio</button>
                </div>
            )}
        </>
    );
};

export default GetEdificio;