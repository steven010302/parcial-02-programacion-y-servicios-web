import React, { useEffect, useState } from 'react';
import './App.css';
const Backend = 'http://localhost:3000';


function App(){
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

 const getUsers = async () => {
    try { 
      const response = await fetch(`${Backend}/users`);
      const data = await response.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  }


  const handleAddUser = async (e) => {
    e.preventDefault(); 
    const newUser = { 
      name: newUserName, 
      email: newUserEmail 
    };

    const response = await fetch(`${Backend}/users`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    const data = await response.json();
    
    
    setUsers(prevUsers => [data.Usuarios ,prevUsers ]);
    
    setNewUserName('');
    setNewUserEmail('');
  }


  const handleDelete = async (userId) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      return; 
    }
    
    await fetch(`${Backend}/users/${userId}`, { 
      method: 'DELETE',
    });
    

    setUsers(prevUsers => prevUsers.filter(user => user.User_ID !== userId));
  }

  return (
    <main className="app-container">
      
      <h1>Gestor de Usuarios</h1>

      
      <section className="card form-card">
        <h3>Agregar nuevo usuario</h3>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Nombre"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            required
          />
          <button type="submit">Agregar</button>
        </form>
      </section>

      <section className="cards-grid">
        {users.map((user) => (
          
          <article key={user.User_ID} className="card user-card">
            
            
            <button 
              className="btn-delete" 
              onClick={() => handleDelete(user.User_ID)}
            >
              &times; 
            </button>
            
            
            <h2>{user.name}</h2>
            <p>{user.email}</p>

          </article>
        ))}
      </section>

    </main>
  );
}

export default App;