const conexion = require('./conexion');
const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

const router = express.Router();
const cors =  require('cors');
//Si no existe una conexion a un host externo se correrá de forma local
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Se habilitan los CORS para poder hacer las consultas a la BD
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Se crea el endpoint de la ruta
app.use('/api', router);

router.use((req, res, next) => {    
    next();
})

//Al correr la BD nos indica en que puerto está
app.listen(
    PORT, 
    () => console.log(`it's running on http:localhost:${PORT}`)
);


//Se crea la consulta para traer las rutas que pasan por el id de parada escanedo, validando que esten activos
router.route('/data/:id').get((req, res) => {
    const id = req.params.id;
    conexion.query(`
    SELECT  nombre, frecuencia, inicio, fin, duracion, rutaID FROM ruta WHERE estaActivos = 1 && rutaID IN 
    (SELECT rutaID FROM rutaparada where paradaID = ${id} && estaActivo=1);`, (err, result) => {
        if(!err){
            res.json(result);            
            console.log(result);
        }else{
            return res.status(404).json({
                ok: false,
                msg: "Ocurrio un error al cargar las rutas",
                err
            })
            // console.log(err);
        }
    });
});

//Se crea la consulta para traer la informacion de la ruta seleccionada al modal
router.route('/modal/:id').get((req, res) => {
    const id = req.params.id;
    conexion.query(`SELECT  nombre, frecuencia, inicio, fin, duracion, rutaID FROM ruta 
    WHERE estaActivos = 1 && rutaID =${id};`, (err, result) => {
        if(!err){
            res.json(result);            
            console.log(result);
        }else{
            console.log(err);
        }
    });
});

//Se crea la consulta para obetener lat y lng de la parada escaneada segun su id
router.route('/parada/:id').get((req, res) => {
    const id = req.params.id;
    conexion.query(`SELECT lat, lng FROM parada where paradaID = ${id};`, (err, result) => {
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
    conexion.query(`select cor.lat, cor.lng from coordenadasruta as cor join ruta as r on cor.rutaID = r.rutaID 
    where cor.rutaID = ${id} and orientacion = 0;`, (err, result) => {
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
    conexion.query(`select cor.lat, cor.lng from coordenadasruta as cor join ruta as r on cor.rutaID = 
    r.rutaID where cor.rutaID = ${id} and orientacion = 1;`, (err, result) => {
        if(!err){
            res.json(result);            
            console.log(result);
        }else{
            console.log(err);
        }
    });
});

