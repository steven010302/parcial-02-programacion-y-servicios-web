
import { Card } from './components/card'
import React, { useEffect, useState } from 'react';


return (
  <div className="app-root">
    <header className="site-header">
      <div className="brand">UserCards Pro</div>
      <nav className="main-nav">
        <a href="#">Inicio</a>
        <a href="#cards">Usuarios</a>
        <a href="#add">Agregar</a>
      </nav>
    </header>


    <main className="container">
      <section className="intro">
        <h1>Lista de usuarios</h1>
        <p className="lead">Panel profesional para visualizar y agregar usuarios en tarjetas responsivas.</p>
      </section>


      <section id="add" className="card form-card">
        <h2>Agregar usuario</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-row">
            <label>Nombre<input name="name" value={form.name} onChange={handleChange} /></label>
            <label>Email<input name="email" value={form.email} onChange={handleChange} /></label>
          </div>
          <div className="form-row">
            <label>Dirección<input name="Address" value={form.Address} onChange={handleChange} /></label>
            <label>Edad<input name="age" type="number" value={form.age} onChange={handleChange} /></label>
          </div>
          <label>Foto URL<input name="photoURL" value={form.photoURL} onChange={handleChange} placeholder="Opcional: URL de la imagen" /></label>
          <div className="form-actions">
            <button type="submit" className="btn primary">Agregar</button>
            <button type="button" className="btn" onClick={() => setForm({ name: '', email: '', Address: '', age: '', photoURL: '' })}>Limpiar</button>
          </div>
        </form>
      </section>


      <section id="cards" className="cards-grid">
        {users.map(user => (
          <article key={user.User_ID} className="user-card">
            <div className="avatar">
              <img src={user.photoURL || `https://via.placeholder.com/180x100?text=${encodeURIComponent(user.name)}`} alt={user.name} />
            </div>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="meta">{user.email} · {user.age} años</p>
              <p className="address">{user.Address}</p>
            </div>
          </article>
        ))}
      </section>
    </main>


    <footer className="site-footer">© {new Date().getFullYear()} UserCards Pro — Hecho con Express + React</footer>
  </div>
);

export default App
