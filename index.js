const conexion = require('./conexion');
const express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('./configs/config');
    app = express();

const router = express.Router();
const cors =  require('cors');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', router);

router.use((req, res, next) => {    
    next();
})

app.listen(
    PORT, 
    () => console.log(`it's running on http:localhost:${PORT}`)
);

router.route('/data/:id').get((req, res) => {
    const id = req.params.id;
    conexion.query(`SELECT nombre, frecuencia, rutaID FROM ruta WHERE rutaID IN (SELECT rutaID FROM rutaparada where paradaID = ${id});`, (err, result) => {
        if(!err){
            res.json(result);            
            console.log(result);
        }else{
            console.log(err);
        }
    });
});

router.route('/lineOne/:id').get((req, res) => {    
    const id = req.params.id;
    conexion.query(`select cor.lat, cor.lng from coordenadasruta as cor join ruta as r on cor.rutaID = r.rutaID where cor.rutaID = ${id} and orientacion = 0;`, (err, result) => {
        if(!err){
            res.json(result);            
            console.log(result);
        }else{
            console.log(err);            
        }
    });
});

router.route('/lineTwo/:id').get((req, res) => {
    const id = req.params.id;
    conexion.query(`select cor.lat, cor.lng from coordenadasruta as cor join ruta as r on cor.rutaID = r.rutaID where cor.rutaID = ${id} and orientacion = 1;`, (err, result) => {
        if(!err){
            res.json(result);            
            console.log(result);
        }else{
            console.log(err);
        }
    });
});

