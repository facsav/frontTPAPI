import React from 'react';

const PostList = ({ posts, onSelect }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
      <h2 style={{ marginRight: '10px' }}>Posts del Usuario</h2>
      <div style={{ maxHeight: '100px', overflowY: 'scroll', flex: 1 }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {posts.map(post => (
            <li key={post.id} onClick={() => onSelect(post.id)} style={{ cursor: 'pointer', marginBottom: '5px' }}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostList;

