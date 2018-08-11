
module.exports = function(app){
   
   //패스워드 암호화를 위한 모듈
   const bkfd2Password = require('pbkdf2-password');
   const hasher = bkfd2Password();
   const passport = require('passport');
   const LocalStrategy = require('passport-local').Strategy;
   
   const conn = require('./db')();
   
   app.use(passport.initialize());
   app.use(passport.session());
   
   passport.serializeUser(function(user, done) {
      let userInfo = {
            authId: user.authId,
            nickname: user.nickname
      }

      done(null, userInfo);
   });
   
   passport.deserializeUser(function(user, done) {
   
      var sql = 'SELECT * FROM users WHERE authId= ?';
      conn.query(sql, [user.authId], (err, results) => {
      
            if(err){
                console.log(err);
                done('There is no user.');
            } else {
                done(null, results[0]);
            }
   
      });
   });

   //로그인 LocalStrategy
   passport.use(new LocalStrategy({
      usernameField: 'id',
      passwordField: 'password',
      session: true
   },
      function(username, password, done){

         let loginId = username;
         let loginPw = password;
      
         let sql = 'SELECT * FROM users WHERE authId = ?';

         conn.query(sql, ['Local:' + loginId], (err, results, fields) => {
            
            //에러 처리
            if(err){
               console.log('[MySQL Error] There is no User');
               return done(err);
            }
            else{
               //해당 사용자가 존재하지 않는 경우
               if(results.length == 0){
                     console.log('[No User] There is no User');
                     return done(null, false);
               }
               else{
                     let user = results[0];
                     hasher( {password: loginPw, salt: user.salt}, (err, pass, salt, hash) => {
                        
                        //로그인 정보가 일치하는 경우
                        if(hash === user.password){
                              console.log('[Success] Login Success');
                              return done(null, user);
                        }
                        //패스워드가 불일치한 경우
                        else{
                              console.log('[Invalid PW] Login Fail');
                              return done(null, false); 
                        }
                     });
                  }
            }
         });
      }
   ));

   return passport;
}