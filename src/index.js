const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/now', (req, res) => {
    var datetime = new Date();
    let now = datetime.toISOString().slice(0,10);
res.send( {dateNow: now});
});

require('../src/controllers/authController')(app);
require('../src/controllers/userController')(app);
require('../src/controllers/projectController')(app);

app.listen(3000, function () {
    console.log('O servidor está rodando na porta 3000!');
  });
