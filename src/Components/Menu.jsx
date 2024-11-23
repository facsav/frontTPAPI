import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const { usuario, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }

    return (
        <div>
            <h1>Bienvenido, {usuario.nombre}!</h1>
            {usuario.tipoUser === 'administrador' ? (
                <>
                    <h2>Permisos Admin</h2>
                    <button class="btn btn-warning" onClick={handleLogout}>Cerrar Sesión</button>
                    <button class="btn btn-warning" onClick={() => navigate('/verEdificios')}>Ver todos los edificios</button>
                    <button class="btn btn-warning" onClick={() => navigate('/addEdificio')}>Agregar Edificio</button>
                    <button class="btn btn-warning" onClick={() => navigate('/getEdificio')}>Ver y borrar edificios</button>
                    <button class="btn btn-warning" onClick={() => navigate('/addPersona')}>Agregar Persona</button>
                    <button class="btn btn-warning" onClick={() => navigate('/addUnidad')}>Agregar Unidad</button>
                    <button class="btn btn-warning" onClick={() => navigate('/getPersona')}>Ver y borrar personas</button>
                </>
            ) : (
                <>
                    <h2>Permisos General</h2>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
            )}
        </div>
    );
};

export default Menu;