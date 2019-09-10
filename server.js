var express = require("express");
var bodyParser = require("body-parser");
var datastore = require("nedb");
var cors = require('cors');
var path = require('path');
var Nota = require('./notas');
var ApiKey = require('./apikeys');

var passport = require('passport');
var LocalAPIKey = require('passport-localapikey-update').Strategy;

const NOTAS_APP_DIR = "/dist/notas-gui";


var urlBase = "/api/v1";
passport.use(new LocalAPIKey(
    (apikey, done) => {
        ApiKey.findOne({ apikey: apikey }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Apikey desconocida' + apikey });
            } else {
                console.log("Logged as: " + user.user);
                return done(null, user);
            }
        })
    }
));


var filename = __dirname + "/notas.json";
var notas = [{ "titulo": "Nota de prueba", "contenido": "recordar completar la colección de todos los metodos de la api en postman" }];
var db = new datastore({
    filename: filename,
    autoload: true

});



var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use(express.static(path.join(__dirname, NOTAS_APP_DIR)));
app.get('/', function (req, res) {
    res.sendFile(paht.join(__dirname, NOTAS_APP_DIR, '/index.html'));
});



app.get(urlBase + "/notas",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        Nota.find((err, notas) => {
            if (err) {
                console.error("Error accediendo a la base de datos");
                res.sendStatus(500);
            } else {
                res.send(notas.map((nota) => {
                    return nota.cleanup();
                }));
            }
        })
    });


app.post(urlBase + "/notas",
    passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        var nota = req.body;
        Nota.create(nota, (err) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.status(200).send('Nota guardada');
            }
        });
    });

app.put(urlBase + "/notas", passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        res.status(405).send("¡no puedes actualizar todo a la vez!");
    });

app.delete(urlBase + "/notas", passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        Nota.deleteMany({}, (err) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
            }
        });
        res.sendStatus(200);
    });


app.get(urlBase + "/notas/:titulo", passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        var titulo = req.params.titulo;
        Nota.find({ "titulo": titulo }, (err, notas) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (notas.length == 0) {
                    res.status(404).send("No se ha encontrado la nota");
                } else if (notas.length > 1) {
                    console.warn("Entrada duplicada...");
                    res.send(notas.map((nota) => {
                        return nota.cleanup();
                    })[0]);
                } else {
                    res.send(notas.map((nota) => {
                        return nota.cleanup();
                    })[0]);
                }
            }
        });

    });

app.delete(urlBase + "/notas/:titulo", passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        var titulo = req.params.titulo;
        Nota.deleteMany({ "titulo": titulo }, (err, eliminada) => {
            if (err) {
                console.error("Error accediendo a la base datos");
                res.sendStatus(500);
            } else {
                if (eliminada.n > 1) {
                    console.warn("Entradas duplicada...");
                } else if (eliminada.n == 0) {
                    res.status(404).send("No se ha encontrado la nota");
                } else {
                    res.sendStatus(200);
                }
            }
        });

    });

app.put(urlBase + "/notas/:titulo", passport.authenticate('localapikey', { session: false }),
    (req, res) => {
        var titulo = req.params.titulo;
        var cambioNota = req.body;
        if (titulo != cambioNota.titulo) {
            res.sendStatus(409);
            return;
        }
        Nota.replaceOne({ "titulo": titulo }, cambioNota, (err, actulizado) => {
            if (err) {
                console.error("Error accediendo a la base datos");
                res.sendStatus(500);
            } else {
                if (actulizado.n > 1) {
                    console.warn("Entradas duplicada...");
                } else if (actulizado.n == 0) {
                    res.status(404).send("No se ha encontrado la nota");
                } else {
                    res.status(201).send("Nota actualizada correctamente");
                }
            }
        });
    });

module.exports.app = app;
module.exports.db = db;
