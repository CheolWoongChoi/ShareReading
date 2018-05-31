
module.exports = function(){

   const mysql = require('mysql');
   const db_info = require('./info/db_info');
   const conn = mysql.createConnection(
      db_info
   );

   conn.connect();

   return conn;
}