const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost/noderest", { useNewUrlParser: true });

mongoose.Promise = global.Promise;
console.log("conectado ao mongodb");
module.exports = mongoose;