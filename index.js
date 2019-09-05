var server = require('./server');
var mongoose = require('mongoose');
var port = (process.env.PORT || 3000);
var dbUrl =  (process.env.DB || 'mongodb+srv://fis2018:2018fis@ortegapablo-jzinl.mongodb.net/test?retryWrites=true&w=majority');
var ApiKey = require('./apikeys');
console.log("Arrancando servidor API...");

mongoose.connect(dbUrl, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    server.app.listen(port);
    console.log("¡Servidor listo...!");
    if (ApiKey.find((err, apikeys) => {
        if (apikeys.length == 0) {
            var testUser = new ApiKey({ user: "fis", password: "asdf" });
            testUser.save(function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('user: ' + user.user + ", " + user.apikey + " saved.");
                }
            });
        } else{
            console.log('user: ' + apikeys + ", " + apikeys);
        }
    }));
});



 