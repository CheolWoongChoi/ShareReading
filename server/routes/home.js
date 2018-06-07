
const express = require('express');
const route = express.Router();
const conn = require('../config/db')();
const multer = require('multer');
const upload = multer({ dest: 'uploads/'})

route.get('/users', (req, res) => {
   let sql = `SELECT nickname FROM users`;
   conn.query(sql, (err, result) => {
      if(err){
         console.log(err);
      }
      else{
         //console.log(result);
         res.send(result);
      }
   });

});

module.exports = route