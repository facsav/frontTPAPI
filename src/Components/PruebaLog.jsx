import React, {useContext} from "react";
import {AuthContext} from "./AuthContext";

const PruebaLog = () => {
    const {usuario} = useContext(AuthContext);

    if (!usuario) {
        return <div>No hay usuario logueado</div>;
    }
    console.log("Usuario logueado:", usuario);

    return (
        <div>
            <h1>Información del Usuario</h1>
            <p>Nombre: {usuario.nombre}</p>
            <p>DNI: {usuario.documento}</p>
            <p>Tipo de Usuario: {usuario.tipoUser}</p>
        </div>
    );
}

export default PruebaLog;