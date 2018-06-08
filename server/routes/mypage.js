
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const _storage = multer.diskStorage({
   
   destination: (req, file, callback) => {

      let path = `./uploads/${req.session.passport.user.nickname}`;

      if(!fs.existsSync(path))
         fs.mkdirSync(path);
      
      callback(null, path);

   },
   filename: (req, file, callback) => {
      callback(null, file.originalname);
   }

});
const upload = multer({ storage: _storage });
const route = express.Router();
const conn = require('../config/db')();

route.get('/books', (req, res) => {

   let nickname = req.session.passport.user.nickname;
   let sql = `SELECT * FROM books WHERE nickname = ? `;

   conn.query(sql, nickname, (err, result) => {
      if(err){
         console.log(err);
         res.send('Internal Server Error : Fetch Books Error');
      }
      else{
         //console.log(result);
         res.send(result);
      }
   });
});

route.post('/add', upload.single('bookImage'), (req, res) => {
   
   //res.send('Uploaded: '+req.file.filename);
   let sql = `INSERT INTO books (nickname, bookName, bookImage, author, pubDate, memo) VALUES ?`;
   let values = [
                    [ req.session.passport.user.nickname,
                     req.body.bookName,
                     req.file.originalname,
                     req.body.author,
                     req.body.pubDate,
                     req.body.memo ]
                ];
   
   conn.query(sql, [values], (err, result) => {
      if(err){
         console.log(err);
         res.send('Internal Server Error : Database Upload Error');
      }
      else{
         //console.log(result);
         res.redirect('/mypage/add/success');
      }
   });
});

route.get('/add/success', (req, res) => {
   res.send(true);
})

module.exports = route