'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let jugadorSchema = new Schema({
    alias: { type: String, required: true },
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
