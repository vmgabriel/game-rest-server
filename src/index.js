'use strict'

import app from './app';

// Conexion con Base de Datos

const port = 3800;

app.listen(port, () => {
    console.log('Servidor de Node http://localhost:'+port);
});
