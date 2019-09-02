var server = require('./server');
var mongoose = require('mongoose');
var port = (process.env.PORT || 3000);
var dbUrl =  (process.env.DB || 'mongodb+srv://fis2018:2018fis@ortegapablo-jzinl.mongodb.net/test?retryWrites=true&w=majority');
console.log("Arrancando servidor API...");

mongoose.connect(dbUrl, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    server.app.listen(port);
    console.log("¡Servidor listo...!");
});



 