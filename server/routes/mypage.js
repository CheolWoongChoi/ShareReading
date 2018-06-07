
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const _storage = multer.diskStorage({
   destination: (req, file, cb) => {

      let path = `./uploads/${req.session.passport.user.nickname}`;

      fs.mkdirSync(path);
      cb(null, path);
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   }
});
const upload = multer({ storage: _storage });
const route = express.Router();
const conn = require('../config/db')();

route.post('/add', upload.single('bookImage'), (req, res) => {
   res.send('Uploaded: '+req.file.filename);
   // let sql = `SELECT nickname FROM users`;
   // conn.query(sql, (err, result) => {
   //    if(err){
   //       console.log(err);
   //    }
   //    else{
   //       //console.log(result);
   //       res.send(result);
   //    }
   // });


});

module.exports = route