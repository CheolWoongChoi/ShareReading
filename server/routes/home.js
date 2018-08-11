
const express = require('express');
const route = express.Router();
const conn = require('../config/db')();

//사용자들의 모든 책 정보를 데이터베이스로부터 가져옴
route.get('/allbooks', (req, res) => {
   let sql = `SELECT * FROM books`;
   
   conn.query(sql, (err, result) => {
      if(err){
         console.log(err);
      }
      else{
         res.send(result);
      }
   });

});

module.exports = route