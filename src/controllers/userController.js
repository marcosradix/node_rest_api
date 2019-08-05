const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/user/all', async (req, res) => {

    try {
        const users  = await User.find({});
        return res.send({ users });
    } catch (err) {
        console.log(err);
        res.status(204).send({ error: "O banco está vazio." });
    }
});

module.exports = app => app.use('/', router);