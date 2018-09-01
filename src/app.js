'use strict'

import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import apiGameRoutes from './routes/game';

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

let router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.use(router);
app.use('/api/v0', apiGameRoutes);

module.exports = app;
