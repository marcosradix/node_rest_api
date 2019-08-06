const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


router.use(authMiddleware);

router.get('/', (req, res) => {
res.status(200).send({ok: true, user: req.userId});
});

module.exports = app => app.use('/projects', router);
