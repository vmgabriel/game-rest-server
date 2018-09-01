'use strict'

import express from 'express';

import md_auth from '../middlewares/authenticated';

let api = express.Router();

api.get('/', md_auth.ensureAuth, (req, res) => {res.status(200).send('hecho correcto')});

module.exports = api;
