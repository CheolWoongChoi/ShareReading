
module.exports = function(passport){

   const bkfd2Password = require("pbkdf2-password");
   const hasher = bkfd2Password();
   const route = require('express').Router();

   //데이터베이스 연결
   const conn = require('../config/db')();   
   
   //회원가입 Form 정보를 처리
   route.post('/register', (req, res) => {
      
      let sql = `SELECT authId FROM users WHERE authId = '${'Local:'+req.body.id}'`;
      conn.query(sql, (err, result) => {
         
         //중복 ID 검사
         if(result.length){
            res.send('DUPL-ID');
         } 
         else{
            sql = `SELECT nickname FROM users WHERE nickname = '${req.body.nickname}'`;
            conn.query(sql, (err, result) => {
            
                  //중복 닉네임 검사
                  if(result.length){
                     res.send('DUPL-NICK');
                  } 
                  else{
                     hasher({password: req.body.password}, (err, pass, salt, hash) => {
                  
                        let user = {
                              authId: 'Local:'+ req.body.id, 
                              password: hash,
                              nickname: req.body.nickname,
                              salt: salt,
                        }
                     
                        let sql = 'INSERT INTO users SET ?';
                        conn.query(sql, user, (err) => {
                  
                              if(err){
                                 res.send(false);
                              }
                              else{
                                 res.redirect('/');
                              }
                        });
                     });//hasher 끝
                  }
            });
         }
      });

   });

   //로그인 처리
   route.post('/login', 
      passport.authenticate('local', { failureRedirect: '/api/auth/login/error' }),
      (req, res) => { res.redirect('/api/auth/login/success'); }
   );
   
   //로그인 성공
   route.get('/login/success', (req, res) => {
      res.send(
            {
              isLogin: true,
              nickname: req.session.passport.user.nickname
            }
      );
   });
   
   //로그인 실패
   route.get('/login/error', (req, res) => {
      res.send(false);
   });

   //로그아웃
   route.get('/logout', (req, res) => {

      sess = req.session;
      if(sess.passport.user.authId){
            req.session.destroy( (err) => {
                  if(err){
                        console.log(err);
                  }
                  else{                  
                       res.send(true);
                  }
            });
      }
   });


   return route;
}