'user strict'

import jwt from 'jwt-simple';
import moment from 'moment';

import 'dotenv/config';

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticación'});
    } else {
        let token = req.headers.authorization.replace(/['"]+/g, '');
        try {
            var payload = jwt.decode(token, process.env.API_PASS);
            if(payload.exp > moment().unix()){
                return res.status(401).send({
                    message: 'EL token ha expirado'
                });
            }
        } catch (ex) {
            return res.status(404).send({
                message: 'EL token no es valido'
            });
        }

        req.user = payload;

        next();
    }
}
