'use strict';

import express from 'express';

import md_auth from '../middlewares/authenticated';

// Modelo
import Jugador from '../../models/player.js';

let api = express.Router();

api.get('/', md_auth.ensureAuth, (req, res) => {res.status(200).send('hecho correcto');});

api.get('/jugadores', md_auth.ensureAuth, (req, res) => {
    res.status(200).send(Jugador.find());
});

module.exports = api;
