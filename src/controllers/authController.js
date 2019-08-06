const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


function generateToken(params = {}){
return jwt.sign({params}, authConfig.secret, {
    expiresIn: 86400
});
}


router.post('/user/register', async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: "Usuário já registrado." });
        }
console.log(JSON.stringify(req.body));
        const userCreated  = await   User.create(req.body);
        user =  Object.assign(new User(), userCreated);
        user.password = undefined;
        const tokenGenerated = generateToken({id: user.id});
        res.send({user, token:tokenGenerated});
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Erro ao registra usuário." });
    }
});


router.post("/authenticate", async (req, res) => {
const {email, password} = req.body;
User.findOne({email: email}).select('+password')
.exec(async function(error, user) {
   if(!user){
    return res.status(400).send({error: 'usuário não encontrado.'});
}
if(!await  bcrypt.compare( password, user.password)) {
    return res.status(400).send({error: 'Senha inválida'});
}
user.password = undefined;

const tokenGenerated = generateToken({id: user.id});


res.send({user, token:tokenGenerated});
});

});

module.exports = app => app.use('/auth', router);