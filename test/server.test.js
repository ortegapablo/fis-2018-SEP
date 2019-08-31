var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var expect = chai.expect;

chai.use(chaiHttp);

describe("Notas API", () => {
    it('hola mundo', (done) => {
        var x = 3;
        var y = 5;
        var resultado = x + y;

        expect(resultado).to.equal(8);
        done();
    });

    before((done) => {
        var notas = [{ "titulo": "prueba 2", "contenido": "contenido de la tercera nota", "fecha": "22/08/2019" },
        { "titulo": "prueba 3", "contenido": "contenido de la tercera nota", "fecha": "22/08/2019" }];
        
        var dbFindStub = sinon.stub(server.db, 'find');
        dbFindStub.yields(null, notas);

        done();
        // server.db.remove({}, { multi: true }, () => {
        //     server.db.insert(notas, () => {
        //         done();
        //     });
        // });
    });
    describe("Get raiz /", () => {
        it("should return HTML", done => {
            chai
                .request(server.app)
                .get("/")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });
    });

    describe('Get /notas', () => {
        it("should return all notas", done => {
            chai
                .request(server.app)
                .get("/api/v1/notas")
                // .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body).to.have.lengthOf(2);
                    // proyectMock.verify();
                    done();
                });




        });
    });
    describe('Post /notas', () => {
        it('Should create a note.', done => {
            var nota = { "titulo": "chaipost", "contenido": "contenido de la nota", "fecha": "22/08/2019" };
            var dbMock = sinon.mock(server.db);
            dbMock.expects('insert').withArgs(nota);
            chai
                .request(server.app)
                .post("/api/v1/notas")
                .send(nota)
                // .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    dbMock.verify();


                    
                    // proyectMock.verify();
                    done();
                });
        });
    });
});