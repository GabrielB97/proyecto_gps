const express = require('express');
const mysql = require('mysql2');
const path = require('path'); // Para manejar rutas de archivos
const app = express();
const port = 3000;

// Conectar a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gps_data'
});

// Servir archivos estáticos (como el HTML y cualquier otro archivo) en la carpeta actual
app.use(express.static(path.join(__dirname)));

// Endpoint para obtener los datos GPS
app.get('/gps-data', (req, res) => {
    db.query('SELECT latitud, longitud FROM posicion', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API y página HTML están en http://localhost:${port}`);
});
