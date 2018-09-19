'use strict';

import mongoose from 'mongoose';
mongoose.Promise = Promise;
let Schema = mongoose.Schema;

let jugadorSchema = new Schema({
    alias: { type: String, required: true },
    contra: {type: String, required: true },
    codigo: { type: Number, required: true },
    correo: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            }
        }
    },
    dinero: { type: Number, default: 1000 },
    dineroMaximo: {type: Number, default: 1000 },
    x: {type: Number},
    y: {type: Number},
    mundoX: {type: Number},
    mundoY: {type: Number},
    mundo: {type: String},
    createdAt: { type: Date, default: Date.now },
    lastSesion: { type: Date, default: Date.now }
});

jugadorSchema.pre('save', () => {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    if (!this.lastSesion) {
        this.lastSesion = now;
    }
});

module.exports = mongoose.model('Jugador', jugadorSchema);
