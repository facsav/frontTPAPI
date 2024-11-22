import { useState } from "react";

//METODOS GET EDIFICIO POR ID Y METODO BORRAR


const GetEdificio = () => {
    const [idEdificio, setIdEdificio] = useState("");
    const [edificio, setEdificio] = useState(null);

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
            setEdificio(null); // Limpiar el estado del edificio después de eliminarlo
        })
        .catch(err => console.error('Error:', err));
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

    return (
        <>
            <h1>Buscar Edificio</h1>
            <input
                type="text"
                value={idEdificio}
                onChange={(e) => setIdEdificio(e.target.value)}
                placeholder="Id del edificio"
            />
            <button onClick={() => buscarEdificio(idEdificio)}>Buscar edificio</button>

            {edificio && (
                console.log(edificio),
                <div>
                    <h1>Edificio encontrado</h1>
                    <div>
                        <h2>Nombre: {edificio.nombre}</h2>
                        <h2>Dirección: {edificio.direccion}</h2>
                        <h2>Código: {edificio.codigo}</h2>
                    </div>
                    <h3>Si desea borrarlo presione el botón:</h3>
                    <button onClick={() => deleteEdifico(idEdificio)}>Borrar edificio</button>
                </div>
            )}
        </>
    );
}

export default GetEdificio;

