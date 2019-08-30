
var chai = require('chai');
var expct = chai.expect;


describe("Notas API", () => {
    it('hola mundo', (done) => {
        var x = 3;
        var y = 5;
        var resultado = x + y;

        expct(resultado).to.equal(8);
        done();
    });
});