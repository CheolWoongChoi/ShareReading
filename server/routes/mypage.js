
const express = require('express');
const fs = require('fs');
const multer = require('multer');

//사용자들이 업로드한 이미지를 저장
const _storage = multer.diskStorage({
  
   //서버의 uploads 디렉터리에 해당 사용자(닉네임)의 디렉터리를 만들고 업로드한 이미지 저장
   destination: (req, file, callback) => {

      let path = `./uploads/${req.session.passport.user.nickname}`;

      if(!fs.existsSync(path))
         fs.mkdirSync(path);
      
      callback(null, path);

   },

   //업로드한 이미지 시간을 이미지 이름에 붙여서, 이미지 이름이 중복되지 않도록 함
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


//특정 사용자의 책 정보를 데이터베이스로부터 가져옴
route.get('/books', (req, res) => {

   let nickname = req.session.passport.user.nickname;
   let sql = `SELECT * FROM books WHERE nickname = ? `;

   conn.query(sql, nickname, (err, result) => {
      if(err){
         console.log(err);
         res.send('Internal Server Error : Fetch Books Error');
      }
      else{
         res.send(result);
      }
   });
});

//데이터베이스에 책 정보를 추가
route.post('/add', upload.single('bookImage'), (req, res) => {
   
   let sql = `INSERT INTO books (nickname, bookName, bookImage, author, pubDate, memo) VALUES ?`;
   let values = [
                    [ req.session.passport.user.nickname,
                     req.body.bookName,
                     req.file.currentFile,
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
         res.send(true);
      }
   });
});

//데이터베이스에 저장된 책 정보를 수정
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

//데이터베이스에서 책 정보를 삭제
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
         let file = `./uploads/${req.session.passport.user.nickname}/${bookImage}`;
         
         //서버에 저장된 이미지 파일을 제거
         if(fs.existsSync(file)){
            fs.unlinkSync(file);
         }
         else{
            console.log('File already deleted');
         }

         res.send(true);

      }
   });
});

module.exports = route