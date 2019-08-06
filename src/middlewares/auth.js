const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


module.exports = (req, res, next) => {
    const authHearder = req.headers.authorization;
    if (!authHearder) {
        return res.status(401).send({ error: 'Token não informado' });
    }
    const parts = authHearder.split(' ');
    if (parts.length !== 2) {
        return res.status(401).send({ error: 'Erro de Token' });

    }

    const [scheme, token] = parts;

    if (!scheme.includes('Bearer')) {
        console.log('Bearer ' +scheme);
        return res.status(401).send({ error: 'Token formado incorretamente' });

    }

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) {
            return res.status(401).send({ error: 'Token  inválido' });
        }
        req.userId = decoded.params.id;
        return next();
    });
}