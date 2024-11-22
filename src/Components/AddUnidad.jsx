import { useState } from "react";

const AddUnidad = () =>{

    const [edificio, setEdificio] = useState(null);
    const [codigoEdificio, setCodigoEdficio] = useState("");
    /*
    const [piso, setPiso] = useState("");
    const [numero, setNumero] = useState("");
    const [habitado, setHabitado] = useState("");
    */
    


    const buscarEdificio = (codigo) => {
        fetch('/edi', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const edificioEncontrado = data.find(edificio => edificio.codigo == codigo);
            if (edificioEncontrado) {
                setEdificio(edificioEncontrado);
                console.log(edificioEncontrado)
            } else {
                alert("Edificio no encontrado");
            }
        })
        .catch(error => {
          console.error('Error al buscar el edificio:', error);
        });
    }

    /*
    const agregarUnidad = () => {
        const unidad = {
            piso: piso,
            numero: numero,
            nombreUser: nombreUser,
            contrasenia: contrasenia,
            tipoUser: tipoUser
            
          }; 

    */
    return(
        <>
        <h1>Agregar Unidad</h1>

        <input type="text"
        value={codigoEdificio}
        onChange={(e) => setCodigoEdficio(e.target.value)}
        placeholder="Edificio"        
        />
        

        {/* <input type="text"
        value={unidad}
        onChange={(e) => setUnidad(e.target.value)}
        placeholder="Edificio"        
        /> */}


        <button onClick={() => buscarEdificio(codigoEdificio)}>Buscar edificio</button>

        {edificio && (
            <div>
                <h1>Edificio encontrado</h1>
                <div>
                    <h3>Nombre: {edificio.nombre}</h3>
                    <h3>Dirección: {edificio.direccion}</h3>
                    <h3>Código: {edificio.codigo}</h3>
                </div>
                <h2>Unidades:</h2>
                {edificio.unidades.map((unidad, index) => (
                    <div key={index}>
                        <h3>Piso: {unidad.piso}</h3>
                        <h3>Numero de depto: {unidad.numero}</h3>
                        <h3>Habitado: {unidad.habitado}</h3>
                        <hr />
                    </div>
                ))}
                <div>

                </div>
                <h3>Si desea agregar una unidad presione el botón:</h3>

            </div>
        )}

        </>
    );


}

export default AddUnidad;