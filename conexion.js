
const mysql = require('mysql');
//Se crea la conexion a la BD con los datos
var conexion = mysql.createConnection({
    host: 'rutas.cm8d43vzy8up.us-east-1.rds.amazonaws.com',        
    database: 'rutas',  
    user: 'admin',
    password: 'enrutatearkus',
    port: '3306'        
});
    //Si la conexion es erronea nos lo indicara
conexion.connect(function(error) {
    if(error){
        console.log(error);
    }else{
        console.log("Conexión exitosa");
    }
});    

module.exports = conexion;