import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        // Cargar el usuario desde localStorage si existe
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    const login = (user) => {
        setUsuario(user);
        localStorage.setItem('usuario', JSON.stringify(user));
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};