
module.exports = function(passport){

   const bkfd2Password = require("pbkdf2-password");
   const hasher = bkfd2Password();
   const route = require('express').Router();

   //Database connect
   const conn = require('../config/db')();   
   
   //Routers
   route.post('/register', (req, res) => {
      
      let sql = `SELECT authId FROM test1 WHERE authId = '${'Local:'+req.body.id}'`;
      conn.query(sql, (err, result) => {
         
         //Duplicate ID
         if(result.length){
            console.log('register id result');
            console.log(result);
            res.send('DUPL-ID');
         } 
         else{
            sql = `SELECT nickname FROM test1 WHERE nickname = '${req.body.nickname}'`;
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
                     
                        let sql = 'INSERT INTO test1 SET ?';
                        conn.query(sql, user, (err) => {
                  
                              if(err){
                                 res.send(false);
                              }
                              else{
                                 // req.login(user, function(err){
                                 //    req.session.save( () => {
                                 //    res.redirect('/');
                                 //    });
                                 req.session.save( () => {
                                 res.redirect('/');
                                 });
                              }
                        });
                     });//hasher
                  }
            });
         }
      });

   });

   route.post('/login', 
      passport.authenticate('local', 
            { 
                  successRedirect: '/home',
                  failureRedirect: '/auth/login',
                  failureFlash: true
            }
      )
   );

   return route;
}