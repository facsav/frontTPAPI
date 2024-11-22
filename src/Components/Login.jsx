import React, { useState } from "react";
import AddEdificio from "./AddEdificio";

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("/per");
      const users = await response.json();
      
      const user = users.find(
        (u) =>
          u.nombreUser &&
          u.contrasenia &&
          u.nombreUser.toLowerCase() === nombreUsuario.toLowerCase() &&
          u.contrasenia === contrasenia
      );

      if (user) {
        setUsuarioLogueado(user);
        console.log("Usuario logueado:", user);
      } else {
        console.log("Usuario o contraseña incorrectos");
        alert("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  const handleLogout = () => {
    setUsuarioLogueado(null);
    setNombreUsuario("");
    setContrasenia("");
  };

  if (usuarioLogueado) {
    if (usuarioLogueado.tipoUser === 'administrador') {
      {console.log("log tipo 1")}
      return (
        <div>
          <h1>Bienvenido, {usuarioLogueado.nombre}!</h1>
          <h2>Permisos Admin</h2>
          <button onClick={handleLogout}>Cerrar Sesión</button>
          <button>
            <a href="/addEdificio">Agregar Edificio</a>
          </button>
          <button>
            <a href="/getEdificio">Ver y borrar edificios</a>
          </button>
          <button>
            <a href="/addPersona">Agregar Persona</a>
          </button>
          <button>
            <a href="/addUnidad">Agregar Unidad</a> 
          </button>
          <button>
            <a href="/getPersona">Ver y borrar personas</a> 
          </button>

        </div>
      );
    } else if (usuarioLogueado.tipoUser === 'general') {
      return (
        <div>
          <h1>Bienvenido, {usuarioLogueado.nombre}!</h1>
          <h2>Permisos General</h2>
          <button onClick={handleLogout}>Cerrar Sesión</button>
 
        </div>
      );
    }
  }

  return (
    <div>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
