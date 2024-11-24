import React, { useEffect, useState } from 'react';

const GetAllEdi = () => {
    const [edificios, setEdificios] = useState([]);

    useEffect(() => {
        fetch('/edi', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setEdificios(data);
        })
        .catch(error => {
            console.error('Error al obtener los edificios:', error);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="departures">
                    <h1>Edificios</h1>
                    <table className="contenido table table-dark table-striped">
                        <thead>
                            <tr>
                                <th id="table-title" scope="col">#</th>
                                <th id="table-title" scope="col">Codigo</th>
                                <th id="table-title" scope="col">Nombre</th>
                                <th id="table-title" scope="col">Direccion</th>
                            </tr>
                        </thead>
                        <tbody id="content">
                            {edificios.map((edificio, index) => (
                                <tr key={edificio.codigo}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{edificio.codigo}</td>
                                    <td>{edificio.nombre}</td>
                                    <td>{edificio.direccion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GetAllEdi;