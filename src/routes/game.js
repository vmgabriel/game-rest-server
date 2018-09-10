'use strict';

import express from 'express';

import md_auth from '../middlewares/authenticated';

// Modelo
import Jugador from '../../models/player.js';

let api = express.Router();

api.get('/', md_auth.ensureAuth, (req, res) => {res.status(200).send('hecho correcto');});

api.get('/jugadores', md_auth.ensureAuth, (req, res) => {
    Jugador.find()
        .then(players => {res.status(200).json(players);})
        .catch(err => {
            console.log(err);
            res.status(500).json({'message': 'Error: '+err});
        });
});

api.get('/jugadores/:id', md_auth.ensureAuth, (req, res) => {
    Jugador.findById(req.params.id)
        .then(jugador => {res.status(200).json(jugador);})
        .catch(err => res.status(500).json({'message': {'error': err}}));
});

api.post('/jugadores', md_auth.ensureAuth, (req, res) => {
    let nJug = new Jugador(req.body);
    nJug.save()
        .then(jugador => {res.status(200).json(jugador);})
        .catch(err => {res.status(400).json({'message': 'Error: '+err});});
});

api.put('/jugadores/:id', md_auth.ensureAuth, (req, res) => {
    Jugador.updateOne({ '_id': req.params.id }, req.body)
        .then(jugador => {res.status(200).json(jugador);})
        .catch(err => {res.status(400).json({'message': err});});
});

api.delete('/jugadores/:id', md_auth.ensureAuth, (req, res) => {
    Jugador.findByIdAndRemove(req.params.id)
        .then(jugador => {res.status(200).json(jugador);})
        .catch(err => {res.status(500).json({'message': err});});
});

module.exports = api;
