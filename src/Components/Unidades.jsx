import React, { useState, useEffect } from 'react';
import UserList from '../UserList';
import PostList from '../PostList';
import CommentList from '../CommentList';

const Unidades = () => {
// Definición de los estados del componente
const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios
const [selectedUser, setSelectedUser] = useState(null); // Estado para almacenar el usuario seleccionado
const [posts, setPosts] = useState([]); // Estado para almacenar la lista de posts
const [selectedPost, setSelectedPost] = useState(null); // Estado para almacenar el post seleccionado
const [comments, setComments] = useState([]); // Estado para almacenar la lista de comentarios
const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga
const [error, setError] = useState(null); // Estado para manejar errores

// useEffect para obtener la lista de usuarios al montar el componente
useEffect(() => {
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/uni'); // Sin localhost:8080, usa la ruta relativa
      if (!response.ok) {
        throw new Error('Respuesta inesperada de la red');
      }
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);


const aep = () =>{
  fetch("http://localhost:8080/uni")
  .then(response => response.json())
  .then(unidades => {
    tableDep(unidades);
    console.log(unidades);
  })
  .catch(err => console.error(err));

  console.log("aaaa");
}


const tableDep = (unidades =>{

  const unis = document.querySelector(".prueba")
  unis.innerHTML=""
  for(let unidad of unidades){

    unis.innerHTML += `
          <tr>
              <th scope="row">°</th>
              <hr/>
              <td>Habitado: ${unidad.habitado}</td>
              <hr/>
              <td>id: ${unidad.id}</td>
              <hr/>
              <td>Piso: ${unidad.piso}</td>
              <hr/>
              <td>Depto: ${unidad.identificador}</td>
          </tr>
          `

  }

})

    
/* 
// Función para manejar la selección de un usuario
const handleUserSelect = async (userId) => {
  setSelectedUser(userId); // Actualiza el estado del usuario seleccionado
  setLoading(true); // Inicia el estado de carga
  try {
    // Realiza una solicitud a la API para obtener los posts del usuario seleccionado
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Respuesta inesperada de la red'); // Manejo de errores de respuesta
    }
    const data = await response.json(); // Convierte la respuesta a JSON
    setPosts(data); // Actualiza el estado de posts con los datos obtenidos
  } catch (error) {
    setError(error.message); // Manejo de errores de solicitud
  } finally {
    setLoading(false); // Finaliza el estado de carga
  }
};

// Función para manejar la selección de un post
const handlePostSelect = async (postId) => {
  setSelectedPost(postId); // Actualiza el estado del post seleccionado
  setLoading(true); // Inicia el estado de carga
  try {
    // Realiza una solicitud a la API para obtener los comentarios del post seleccionado
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    if (!response.ok) {
      throw new Error('Respuesta inesperada de la red'); // Manejo de errores de respuesta
    }
    const data = await response.json(); // Convierte la respuesta a JSON
    setComments(data); // Actualiza el estado de comentarios con los datos obtenidos
  } catch (error) {
    setError(error.message); // Manejo de errores de solicitud
  } finally {
    setLoading(false); // Finaliza el estado de carga
  }
};

// Función para manejar la adición de un comentario
const handleAddComment = async (postId, comment) => {
  setLoading(true); // Inicia el estado de carga
  try {
    // Realiza una solicitud a la API para agregar un nuevo comentario
    const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment), // Convierte el comentario a JSON
    });
    if (!response.ok) {
      throw new Error('Respuesta inesperada de la red'); // Manejo de errores de respuesta
    }
    const newComment = await response.json(); // Convierte la respuesta a JSON
    setComments([...comments, newComment]); // Actualiza el estado de comentarios con el nuevo comentario
  } catch (error) {
    setError(error.message); // Manejo de errores de solicitud
  } finally {
    setLoading(false); // Finaliza el estado de carga
  }
};

return (
  <div style={{ position: 'relative' }}>
    {loading && (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <p>Loading...</p>
      </div>
    )}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <UserList users={users} onSelect={handleUserSelect} />
    {selectedUser && <PostList posts={posts} onSelect={handlePostSelect} />}
    {selectedPost && <CommentList comments={comments} onAddComment={handleAddComment} postId={selectedPost} />}
  </div>
);

*/

return(
  <div>
    <button onClick={ () => aep()}>AEP</button>

  <section className='prueba'>


  </section>


  </div>

)
}

export default Unidades;