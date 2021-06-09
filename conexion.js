const mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'rutas.cm8d43vzy8up.us-east-1.rds.amazonaws.com',        
    database: 'rutas',  
    user: 'admin',
    password: 'enrutatearkus',
    port: '3306'        
});
    
conexion.connect(function(error) {
    if(error){
        console.log(error);
    }else{
        console.log("Conexión exitosa");
    }
});    

module.exports = conexion;