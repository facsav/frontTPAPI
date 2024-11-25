import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const AddImagen = () => {
    const { usuario } = useContext(AuthContext);
    const [idReclamo, setIdReclamo] = useState('');
    const [urlImagen, setUrlImagen] = useState('');
    const [tipoImagen, setTipoImagen] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [reclamoEncontrado, setReclamoEncontrado] = useState(false);

    const buscarReclamo = () => {
        if (!idReclamo) {
            setMensaje('Debe ingresar el ID del reclamo');
            return;
        }

        fetch(`/reclamosNum/${idReclamo}`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al verificar el reclamo');
            }
            return response.json();
        })
        .then(data => {
            if (data.usuario.documento !== usuario.documento) {
                setMensaje('No tiene permisos para agregar una imagen a este reclamo');
                setReclamoEncontrado(false);
                return;
            }
            setMensaje('Reclamo encontrado');
            setReclamoEncontrado(true);
        })
        .catch(error => {
            console.error('Error al verificar el reclamo:', error);
            setMensaje('Error al verificar el reclamo, usted no lo hizo, o no existe');
            setReclamoEncontrado(false);
        });
    };

    const agregarImagenReclamo = () => {
        if (!urlImagen || !tipoImagen) {
            setMensaje('Debe ingresar la URL de la imagen y el tipo de imagen');
            return;
        }

        const imagen = {
            direccion: urlImagen,
            tipo: tipoImagen
        };

        fetch(`/addImagen2/${idReclamo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(imagen),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.text();
        })
        .then(text => {
            console.log('Respuesta del servidor al agregar imagen:', text);
            setMensaje('Imagen agregada exitosamente');
            setIdReclamo('');
            setUrlImagen('');
            setTipoImagen('');
            setReclamoEncontrado(false);
        })
        .catch(error => {
            console.error('Error al agregar Imagen:', error);
            setMensaje('Error al agregar Imagen');
        });
    };

    if (!usuario) {
        console.log('No hay usuario logueado');
        return <div>No hay usuario logueado</div>;
    }

    if (usuario.tipoUser !== 'general') {
        console.log('Usuario no tiene permisos para agregar imágenes');
        return <div>No tiene permisos para agregar imágenes</div>;
    }

    return (
        <>
            <h1>Agregar Imagen al Reclamo</h1>
            <div>
                <label htmlFor="idReclamo">ID del Reclamo: </label>
                <input
                    type="text"
                    id="idReclamo"
                    value={idReclamo}
                    onChange={(e) => setIdReclamo(e.target.value)}
                />
                <button className="btn btn-warning" onClick={buscarReclamo}>Buscar Reclamo</button>
            </div>
            {mensaje && <p>{mensaje}</p>}
            {reclamoEncontrado && (
                <div>
                    <div>
                        <label htmlFor="urlImagen">URL de la Imagen: </label>
                        <input
                            type="text"
                            id="urlImagen"
                            value={urlImagen}
                            onChange={(e) => setUrlImagen(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="tipoImagen">Tipo de Imagen: </label>
                        <select
                            id="tipoImagen"
                            value={tipoImagen}
                            onChange={(e) => setTipoImagen(e.target.value)}
                        >
                            <option value="">Seleccione un tipo</option>
                            <option value="jpg">JPG</option>
                            <option value="png">PNG</option>
                        </select>
                    </div>
                    <button className="btn btn-warning" onClick={agregarImagenReclamo}>Agregar Imagen</button>
                </div>
            )}
        </>
    );
};

export default AddImagen;