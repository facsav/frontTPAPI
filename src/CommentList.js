import React, { useState } from 'react';

const CommentList = ({ comments, onAddComment, postId }) => {
  const [newComment, setNewComment] = useState({ postId, name: '', email: '', body: '' });
  const [selectedComment, setSelectedComment] = useState(null);

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComment(postId, newComment);
    setNewComment({ postId, name: '', email: '', body: '' });
  };

  const handleCommentClick = (comment) => {
    setSelectedComment(comment);
  };

  const handleCloseModal = () => {
    setSelectedComment(null);
  };

  return (
    <div>
      <h2>Comentarios al Post</h2>
      <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
        <ul>
          {comments.map(comment => (
            <li key={comment.id} onClick={() => handleCommentClick(comment)} style={{ cursor: 'pointer' }}>
              <p><strong>{comment.name}</strong>: {comment.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h3>Add a Comment</h3>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
          <input
            type="text"
            name="name"
            value={newComment.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
            style={{ marginRight: '10px' }}
          />
          <input
            type="email"
            name="email"
            value={newComment.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={{ marginRight: '10px' }}
          />
          <textarea
            name="body"
            value={newComment.body}
            onChange={handleChange}
            placeholder="Comentario"
            required
            style={{ marginRight: '10px' }}
          />
        </div>
        <button type="submit">Agregar Comentario</button>
      </form>

      {selectedComment && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            maxWidth: '500px',
            width: '100%'
          }}>
            <h3>{selectedComment.name}</h3>
            <p>{selectedComment.body}</p>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;



