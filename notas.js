var mongoose = require("mongoose");

var notaSchema = new mongoose.Schema({
    titulo: String,
    contenido: String,
    fecha: Date
});

notaSchema.methods.cleanup = function() {
    return {titulo: this.titulo, contenido: this.contenido, fecha: this.fecha};
};

var Nota = mongoose.model("Nota", notaSchema);
module.exports = Nota;