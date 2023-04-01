//IMPORTAR MODULOS
const mysql = require('mysql');
const { promisify } = require('util') 
//Crear conexion with file key
const { db_key } = require('./mysql_key.js');

const pool = mysql.createPool(db_key);

pool.getConnection((err, connection)=>{
    if(err){ 
      if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.error('DATABASE CONNECTION WAS CLOSED');
      }
      if(err.code === 'ER_CON_COUNT_ERROR'){
        console.error('DATABASE HAS TO MANY CONNECTIONS');
      }
      if(err.code === 'ECONNREFUSED'){
        console.error('DATABASE CONNECTION WAS REFUSED');
      }
    }

    if(connection){
      connection.release();
      console.log('conectado!');
      return;
    } 
  });

//Transformar callback en promesas 
pool.query = promisify(pool.query);

module.exports = pool; //Export