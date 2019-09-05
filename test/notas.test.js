
var chai = require('chai');

var Nota = require('../notas');
var mongoose = require('mongoose');
var expect = chai.expect;



describe("Nota DB connection", () => {

    before((done) => {
        var dbUrl = (process.env.DB || 'mongodb+srv://fis2018:2018fis@ortegapablo-jzinl.mongodb.net/test?retryWrites=true&w=majority');
        mongoose.connect(dbUrl, { useNewUrlParser: true });
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            done();
        });
    });

    beforeEach((done) => {
        Nota.deleteMany({}, (err) => {
            done();
        });
    });
    it('escribe una nota en la DB', (done) => {
        var nota = new Nota({ "titulo": "prueba 2", "contenido": "contenido de la tercera nota", "fecha": "09/02/2019" });
        nota.save((err, nota) => {
            expect(err).is.null;
            Nota.find({}, (err, notas) => {
                expect(notas).to.have.lengthOf(1);
                done();
            });
        });

    });

    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
})