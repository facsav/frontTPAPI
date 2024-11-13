import React from 'react';

const UserList = ({ users, onSelect }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <h2 style={{ marginRight: '10px' }}>Usuarios</h2>
      <select onChange={(e) => onSelect(e.target.value)} style={{ padding: '5px' }}>
        <option value="">Seleccione un usuario</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};

export default UserList;

