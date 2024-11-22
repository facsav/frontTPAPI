import { useState } from "react";

const GetPersona = () => {

    const [documento, setDocumento] = useState("");
    const [persona, setPersona] = useState(null);

    const deletePersona = (documento) => {
        fetch(`/removePersona/${documento}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                alert("Error al eliminar la persona, es probable que el Documento ingresado sea Incorrecto, Pruebe otra vez");
                throw new Error("Error al eliminar la persona, es probable que el Documento ingresado sea Incorrecto, Pruebe otra vez");
            }
            return response.text(); // Cambiado a text() ya que el método Java devuelve un String
        })
        .then(message => {
            console.log(message);
            setPersona(null); // Limpiar el estado de persona después de eliminarlo
        })
        .catch(err => console.error('Error:', err));
    }

    const buscarPersona = (documento) => {
        fetch('/per', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const personaEncontrada = data.find(persona => persona.documento == documento);
            if (personaEncontrada) {
                setPersona(personaEncontrada);
            } else {
                alert("Persona no encontrada");
            }
        })
        .catch(error => {
          console.error('Error al buscar la persona:', error);
        });
    }

    return (
        <>
            <h1>Buscar Persona</h1>
            <input
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                placeholder="Documento de la persona"
            />
            <button onClick={() => buscarPersona(documento)}>Buscar Persona</button>

            {persona && (
                <div>
                    {console.log(persona)}
                    <h1>Persona encontrado</h1>
                    <div>
                        <h2>Documento: {persona.documento}</h2>
                        <h2>Nombre: {persona.nombre}</h2>
                        <h2>Nombre de usuario: {persona.nombreUser}</h2>
                        <h2>tipo user: {persona.tipoUser}</h2>
                    </div>
                    <h3>Si desea borrarlo presione el botón:</h3>
                    <button onClick={() => deletePersona(documento)}>Borrar persona</button>
                </div>
            )}
        </>
    );


}

export default GetPersona;