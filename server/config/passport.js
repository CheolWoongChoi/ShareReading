
module.exports = function(app){
   
   const bkfd2Password = require('pbkdf2-password');
   const hasher = bkfd2Password();
   const passport = require('passport');
   const LocalStrategy = require('passport-local').Strategy;
   
   const conn = require('./db')();
   
   app.use(passport.initialize());
   app.use(passport.session());
   

   //Login LocalStrategy
   passport.use(new LocalStrategy({
      usernameField: 'id',
      passwordField: 'password',
      session: true,
      passReqToCallback : true
   },
      function(username, password, done){

         let loginId = username;
         let loginPw = password;
      
         let sql = 'SELECT * FROM test1 WHERE authId = ?';

         conn.query(sql, ['Local:' + loginId], (err, results, fields) => {
            
            //Error
            if(err){
               console.log('There is no User');
               //res.send(false);
               return done('false');
            }
            else{
               //No User
               if(results.length == 0){
                     console.log('There is no User');
                     //res.send(false);
                     return done(null, false, { message: 'false'});
               }
               else{
                     let user = results[0];
                     hasher( {password: loginPw, salt: user.salt}, (err, pass, salt, hash) => {
                        
                        //Same ID && PW
                        if(hash === user.password){
                              console.log('Login Success');
                              return done(null, user);
                              // req.session.save( () => {
                              //    res.send(true);
                              // });
                        }
                        //Invalid PW
                        else{
                              //res.send(false);
                              return done(null, false, { message : 'false'}); 
                        }
                     });
                  }
            }
         });
      }
   ));


   //From passport info To Session
   passport.serializeUser(function(user, done) {
      console.log('***SerializeUser***', user);
      done(null, user.authId);
   });
   
   passport.deserializeUser(function(id, done) {
   
      console.log('***DeserializeUser***', id);
      
      var sql = 'SELECT * FROM test1 WHERE authId= ?';
      conn.query(sql, [id], (err, results) => {
      
            if(err){
            console.log(err);
            done('There is no user.');
            } else {
            done(null, results[0]);
            }
   
      });
   });

   return passport;
}