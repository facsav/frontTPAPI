import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('/per');
            const users = await response.json();
            
            const user = users.find(
                (u) =>
                    u.nombreUser &&
                    u.contrasenia &&
                    u.nombreUser.toLowerCase() === nombreUsuario.toLowerCase() &&
                    u.contrasenia === contrasenia
            );

            if (user) {
                login(user);
                console.log('Usuario logueado:', user);
                navigate('/menu');
            } else {
                console.log('Usuario o contraseña incorrectos');
                alert('Usuario o contraseña incorrectos');
            }
        } catch (err) {
            console.error('Error al obtener usuarios:', err);
        }
    };

    return (
        <div className="container">

            <div className='login'>
                <h1>Login</h1>
                <input
                    type="text"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    placeholder="Nombre de usuario"
                />
                <input
                    type="password"
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                    placeholder="Contraseña"
                />
                <button className="btn btn-warning" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;