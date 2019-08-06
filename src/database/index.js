const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
console.log("conectado ao banco mongodb");
module.exports = mongoose;