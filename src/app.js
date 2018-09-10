'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';

mongoose.Promise = Promise;

import apiGameRoutes from './routes/game';

import configConection from '../config/connection';

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Conexion con la base de datos
mongoose.connect(configConection.configDB.uri, configConection.configDB.options);

// Testeo basico de la base de datos para la revision que este este encendido
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + configConection.configDB.uri);
});

let router = express.Router();

router.get('/', (req, res) => {
    res.send('Servidor Activo Actualmente');
});

app.use(router);
app.use('/api/v0', apiGameRoutes);

module.exports = app;
