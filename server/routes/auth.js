
module.exports = function(passport){

   const bkfd2Password = require("pbkdf2-password");
   const hasher = bkfd2Password();
   const route = require('express').Router();

   //Database connect
   const conn = require('../config/db')();   
   
   //Routers
   route.post('/register', (req, res) => {
      
      let sql = `SELECT authId FROM users WHERE authId = '${'Local:'+req.body.id}'`;
      conn.query(sql, (err, result) => {
         
         //Duplicate ID
         if(result.length){
            console.log('register id result');
            console.log(result);
            res.send('DUPL-ID');
         } 
         else{
            sql = `SELECT nickname FROM users WHERE nickname = '${req.body.nickname}'`;
            conn.query(sql, (err, result) => {
            
                  //Duplicate Nickname
                  if(result.length){
                     console.log('register nickname result');
                     console.log(result);
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
                     });//hasher
                  }
            });
         }
      });

   });

   route.post('/login', 
      passport.authenticate('local', { failureRedirect: '/auth/login/error' }),
      (req, res) => { res.redirect('/auth/login/success?authId='+req.user.authId); }
   );
   
   route.get('/login/success', (req, res) => {
      res.send(true);
   });
   
   route.get('/login/error', (req, res) => {
      res.send(false);
   });

   route.get('/logout', (req, res) => {
      req.logout();
      req.session.save((err) => {});
   });


   return route;
}