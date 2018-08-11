
module.exports = function(){

   const mysql = require('mysql');
   const db_info = require('./info/db_info');

   //데이터베이스 정보를 가져옴
   const conn = mysql.createConnection(
      db_info
   );

   //mysql서버와 연동
   conn.connect();

   return conn;
}