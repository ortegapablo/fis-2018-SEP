var server = require('./server');
var port = (process.env.PORT || 3000);
console.log("Arrancando servidor API...");
server.app.listen(port);
console.log("¡Servidor listo...!");

 