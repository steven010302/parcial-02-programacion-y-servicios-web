console.log("Registro de usuarios")
require("dotenv").config();
const Usuarios = require('./Data/Usuarios')
const express = require('express');
const app = express();
const PORT = process.env.PORT;


// Middleware
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.json());




app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a Usuarios.com',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

app.get('/users', (req, res) => {
    res.json({
        Succes: 'true',
        users: Usuarios
    });
});


app.get('/users/:User_ID', (req, res) => {
    const { User_ID } = req.params;
    const Usuario = Usuarios.find((Usuario) => Usuario.User_ID === parseInt(User_ID));
    if (!Usuario) {
        return res.status(404).json({
            message: `User for id = ${User_ID} no found`,
            Succes: 'false',
            
        });
    }

    res.status(200).json({
        message: 'User found',
        status: 'true',
        user: Usuario
    });
}
)



app.post('/AgregarUsuarios', (req, res) => {
    const { name, phone, email, address, age, photoURL } = req.body;
    const Usuario = { User_ID: (Usuarios.length + 1).toString(), name, phone, email, address, age, photoURL };
    Usuarios.push(Usuario);
    res.json({
        message: 'User add',
        timestamp: new Date().toISOString(),
        status: 'succes',
        Usuarios: Usuario
    });
});

app.listen(PORT, () => {
    console.log(`ServUser_IDor en http://localhost:${PORT}`);
});