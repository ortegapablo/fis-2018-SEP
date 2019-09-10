var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var Nota = require('../notas');
var ApiKey = require('../apikeys');
var expect = chai.expect;

chai.use(chaiHttp);

describe("Notas API", () => {
    before(() => {
        var ApiKeyStub = sinon.stub(ApiKey, 'findOne');
        ApiKeyStub.yields(null, new ApiKey({user:'test'}));
    });
    it('hola mundo', (done) => {
        var x = 3;
        var y = 5;
        var resultado = x + y;

        expect(resultado).to.equal(8);
        done();
    });


    describe("Get raiz /", () => {
        it("should return HTML", done => {
            chai
                .request(server.app)
                .get("/")
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });
    });

    describe('Get /notas', () => {
        var nota = new Nota({"titulo": "prueba 2", "contenido": "contenido de la tercera nota", "fecha": "09/02/2019"})
        var notatMock = sinon.mock(nota);
        notatMock.expects('cleanup').returns({ "titulo": "prueba 2", "contenido": "contenido de la tercera nota", "fecha": "09/02/2019" });
        var notaStub = sinon.stub(Nota, 'find');
        notaStub.yields(null, [nota]);
        it("should return all notas", done => {
            chai
                .request(server.app)
                .get("/api/v1/notas")
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body).to.have.lengthOf(1);
                    notatMock.verify();
                    done();
                });




        });
    });
    describe('Post /notas', () => {
        it('Should create a note.', done => {
            var nota = { "titulo": "chaipost", "contenido": "contenido de la nota", "fecha": "08/22/2019" };
            var dbMock = sinon.mock(Nota);
            dbMock.expects('create').withArgs(nota).yields(null);
            chai
                .request(server.app)
                .post("/api/v1/notas")
                .send(nota)
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    dbMock.verify();
                    done();
                });
        });
    });

    describe('Post /notas', () => {
        it('Should return not authorize 401.', done => {
            var nota = { "titulo": "chaipost", "contenido": "contenido de la nota", "fecha": "08/22/2019" };
            // var dbMock = sinon.mock(Nota);
            // dbMock.expects('create').withArgs(nota).yields(null);
            chai
                .request(server.app)
                .post("/api/v1/notas")
                .send(nota)
              //  .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(401);
              //      dbMock.verify();
                    done();
                });
        });
    });

    describe('Post /notas', () => {
        it('should return 500 if fails', done => {
            var nota = { "titulo": "chaipost", "contenido": "contenido de la nota", "fecha": "08/22/2019" };
            var dbMock = sinon.mock(Nota);
            dbMock.expects('create').withArgs(nota).yields(true);
            chai
                .request(server.app)
                .post("/api/v1/notas")
                .send(nota)
                .query({ apikey: "test" })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    dbMock.verify();
                    done();
                });
        });
    });
});