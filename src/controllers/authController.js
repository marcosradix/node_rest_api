const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/user/register', async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: "Usuário já registrado." });
        }

        const userCreated  = await   User.create(req.body);
        newUser =  Object.assign(new User(), userCreated);
        newUser.password = undefined;
        return res.send({ newUser });
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "Erro ao registra usuário." });
    }
});

module.exports = app => app.use('/auth', router);