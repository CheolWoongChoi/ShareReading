
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

      let dt = new Date();
      let time = dt.getFullYear() + '' 
                  + (dt.getMonth()+1) + '' 
                  + dt.getDate() + '_' 
                  + dt.getHours() + '' 
                  + dt.getMinutes() + '_';

      let currentFile = time + file.originalname;
      file.currentFile = currentFile;

      callback(null, currentFile);
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
                     req.file.currentFile,
                     req.body.author,
                     req.body.pubDate,
                     req.body.memo ]
                ];
   //console.log(req.body);
   
   conn.query(sql, [values], (err, result) => {
      if(err){
         console.log(err);
         res.send('Internal Server Error : Database Upload Error');
      }
      else{
         res.send(true);
      }
   });
});

route.post('/modify', upload.array(), (req, res) => {

   sql = `UPDATE books SET bookName=?, author=?, pubDate=?, memo=? WHERE nickname=? AND no=?`;

   conn.query(sql, 
               [
                  req.body.bookName, 
                  req.body.author, 
                  req.body.pubDate,
                  req.body.memo,
                  req.session.passport.user.nickname,
                  req.body.no
               ], 
               (err, result) => {
                  if(err){
                     console.log(err);
                     res.send('Internal Server Error : Database Update Error');
                  }
                  else{
                     res.send(true);
               }
      });
});

route.delete('/delete', (req, res) => {
   
   let nickname = req.session.passport.user.nickname;
   let bookImage = req.query.bookImage;
   let sql = 'DELETE FROM books WHERE nickname = ? AND bookImage = ?';

   conn.query(sql, [nickname, bookImage], (err, result) => {
      if(err){
         console.log(err);
         res.send('Internal Server Error : Database Upload Error');
      }
      else{
         console.log('db delete ok');

         let file = `./uploads/${req.session.passport.user.nickname}/${bookImage}`;

         if(fs.existsSync(file)){
            fs.unlinkSync(file);
            console.log('file delete ok');
         }
         else{
            console.log('File already deleted');
         }

         res.send(true);

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