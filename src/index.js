'use strict';

import app from './app';

// Conexion con Base de Datos

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', socket => {
    console.log('a user connected');
});

const port = 3800;

app.listen(port, () => {
    console.log('Servidor de Node http://localhost:'+port);
});
