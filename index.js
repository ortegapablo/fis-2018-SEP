var express = require("express");
var bodyParser = require("body-parser");
var datastore = require("nedb"); 
var cors = require('cors');
var path = require('path');
const NOTAS_APP_DIR = "/dist/notas-gui";

var port = 3000;
var urlBase = "/api/v1";
var filename = __dirname + "/notas.json";
var notas = [{"titulo":"Nota de prueba","contenido": "recordar completar la colección de todos los metodos de la api en postman"}];
var db = new datastore({filename: filename,
    autoload: true

});

console.log("Arrancando servidor API...");

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, NOTAS_APP_DIR)));
app.get('/', function(req, res) {
    res.sendFile(paht.join(__dirname, NOTAS_APP_DIR, '/index.html'));
});



app.get(urlBase + "/notas", (req, res) =>{
    db.find({}, (err, notas) => {
        if (err) {
            console.error("Error accediendo a la base de datos");
            res.sendStatus(500);
        } else {
            res.send(notas.map((nota) => {
                delete nota._id;
                return nota;
            }));
        }
    })
}); 


app.post(urlBase + "/notas", (req, res)=> {
    db.insert(req.body)
    //notas.push(req.body);
   // res.sendStatus(201);
   res.status(200).send('Nota guardada') 
});

app.put(urlBase + "/notas", (req, res) => {
    res.status(405).send("¡no puedes actualizar todo a la vez!");
});

app.delete(urlBase + "/notas", (req, res)=>{
    db.remove({});
    res.sendStatus(200);
});


app.get( urlBase + "/notas/:titulo" , (req, res) =>{
    var titulo =req.params.titulo;
    db.find({"titulo": titulo},(err, notas)=>{
        if(err) {
            res.sendStatus(500);
        }else{
            if(notas.length==0){
                res.status(404).send("No se ha encontrado la nota"); 
            }else if(notas.length>1){
                console.warn("Entrada duplicada...");
                res.send(notas.map((nota)=>{
                    delete nota._id;
                    return nota; })[0]);
            }else{
                res.send(notas.map((nota)=>{
                delete nota._id;
                return nota;
       
                
            })[0]);
            }
        }
    });     

});

app.delete( urlBase + "/notas/:titulo" , (req, res) =>{
    var titulo =req.params.titulo;
    db.remove({"titulo": titulo},(err, eliminada)=>{
        if(err) {
            console.error("Error accediendo a la base datos");
            res.sendStatus(500);
        }else{
            if(eliminada>1){
                console.warn("Entradas duplicada...");
            }else if(eliminada==0){
                res.status(404).send("No se ha encontrado la nota");
            }else{ 
                res.status(201).send("Nota eliminada correctamente");
            }
        }
    });     

});

app.put( urlBase + "/notas/:titulo", (req, res)=>{
    var titulo =req.params.titulo;
    var cambioNota =req.body;
    if(titulo != cambioNota.titulo){
        res.sendStatus(409);
        return;
    }
    db.update({"titulo": titulo} , cambioNota, (err, actulizado)=>{
        if(err){
            console.error("Error accediendo a la base datos");
            res.sendStatus(500);   
        } else {
            if(actulizado>1) {
                console.warn("Entradas duplicada...");    
            }else if(actulizado == 0){
                res.status(404).send("No se ha encontrado la nota");
            } else {
                res.status(201).send("Nota actualizada correctamente");
            }
        }    
    });
});
app.listen(port);
console.log("¡Servidor listo...!");

