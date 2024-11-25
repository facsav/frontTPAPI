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
                    <div className=''>
                        
                        <button className="btn btn-warning" onClick={handleLogout}>Cerrar Sesión</button>
                        <h3>Edificios</h3>
                        <button className="btn btn-warning" onClick={() => navigate('/verEdificios')}>Ver todos los edificios</button>
                        <button className="btn btn-warning" onClick={() => navigate('/addEdificio')}>Agregar Edificio</button>
                        <button className="btn btn-warning" onClick={() => navigate('/getEdificio')}>Ver y borrar edificios</button>
                        <h3>Unidades</h3>
                        <button className="btn btn-warning" onClick={() => navigate('/getUnidad')}>Ver y borrar unidades</button>
                        <button className="btn btn-warning" onClick={() => navigate('/addUnidad')}>Agregar Unidad</button>
                        <button className="btn btn-warning" onClick={() => navigate('/liberarUnidad')}>Liberar Unidad</button>
                        <button className="btn btn-warning" onClick={() => navigate('/addInquilino')}>Agregar Inquilino</button>
                        <h3>Personas</h3>
                        <button className="btn btn-warning" onClick={() => navigate('/addPersona')}>Agregar Persona</button>
                        <button className="btn btn-warning" onClick={() => navigate('/getPersona')}>Ver y borrar personas</button>
                        <button className="btn btn-warning" onClick={() => navigate('/addDuenio')}>Agregar Dueño</button>
                        <button className="btn btn-warning" onClick={() => navigate('/transferirUniDue')}>Transferir Unidad a Dueño</button>
                        <h3>Reclamos</h3>
                        <button className="btn btn-warning" onClick={() => navigate('/VerTodosReclamos')}>ver todos los reclamos</button>
                        <button className="btn btn-warning" onClick={() => navigate('/cambiarEstado')}>cambiar estado de reclamos</button>

                    
                    </div>



                </>
            ) : (
                <>
                    <h2>Permisos General</h2>
                    <button className='btn btn-warning' onClick={handleLogout}>Cerrar Sesión</button>
                    <h3>Reclamos</h3>
                    <button class="btn btn-warning" onClick={() => navigate('/VerReclamosDeEdificio')}>Ver reclamos en mi edificio</button>
                    <button class="btn btn-warning" onClick={() => navigate('/verReclamos')}>Ver reclamos hechos por mi</button>
                    <button class="btn btn-warning" onClick={() => navigate('/addReclamo')}>agregar reclamos</button>


                </>
            )}
        </div>
    );
};

export default Menu;