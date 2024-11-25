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
                    <button class="btn btn-warning" onClick={() => navigate('/getUnidad')}>Ver y borrar unidades</button>
                    <button class="btn btn-warning" onClick={() => navigate('/addDuenio')}>Agregar Dueño</button>
                    <button class="btn btn-warning" onClick={() => navigate('/addInquilino')}>Agregar Inquilino</button>
                    <button class="btn btn-warning" onClick={() => navigate('/liberarUnidad')}>Liberar Unidad</button>
                    <button class="btn btn-warning" onClick={() => navigate('/transferirUniDue')}>Transferir Unidad a Dueño</button>



                    <button class="btn btn-warning" onClick={() => navigate('/verReclamos')}>Ver reclamos</button>
                    <button class="btn btn-warning" onClick={() => navigate('/addReclamo')}>agregar reclamos</button>
                    <button class="btn btn-warning" onClick={() => navigate('/VerTodosReclamos')}>ver todos los reclamos</button>
                </>
            ) : (
                <>
                    <h2>Permisos General</h2>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                    <button class="btn btn-warning" onClick={() => navigate('/verReclamos')}>Ver reclamos</button>
                    <button class="btn btn-warning" onClick={() => navigate('/addReclamo')}>agregar reclamos</button>
                    <button class="btn btn-warning" onClick={() => navigate('/VerTodosReclamos')}>ver todos los reclamos</button>
                </>
            )}
        </div>
    );
};

export default Menu;