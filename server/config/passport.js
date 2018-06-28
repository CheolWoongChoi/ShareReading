
module.exports = function(app){
   
   const bkfd2Password = require('pbkdf2-password');
   const hasher = bkfd2Password();
   const passport = require('passport');
   const LocalStrategy = require('passport-local').Strategy;
   
   const conn = require('./db')();
   
   app.use(passport.initialize());
   app.use(passport.session());
   

   //From passport info To Session
   passport.serializeUser(function(user, done) {
      //console.log('[SerializeUser]');

      let userInfo = {
            authId: user.authId,
            nickname: user.nickname
      }

      done(null, userInfo);
   });
   
   passport.deserializeUser(function(user, done) {
   
      //console.log('[DeserializeUser]');
      
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

   //Login LocalStrategy
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
            
            //Error
            if(err){
               console.log('[MySQL Error] There is no User');
               return done(err);
            }
            else{
               //No User
               if(results.length == 0){
                     console.log('[No User] There is no User');
                     return done(null, false);
               }
               else{
                     let user = results[0];
                     hasher( {password: loginPw, salt: user.salt}, (err, pass, salt, hash) => {
                        
                        //Same ID && PW
                        if(hash === user.password){
                              console.log('[Success] Login Success');
                              return done(null, user);
                        }
                        //Invalid PW
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