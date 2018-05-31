

module.exports = function(db_info, session){

   const MySQLStore = require('express-mysql-session')(session);

   const session_info =
   {
      secret: "welcome1!to2@share_reading3#4$5%6^7*8*9(0)",
      resave: false,
      saveUninitialized: true,
      store: new MySQLStore(
         db_info
      )
   } 

   return session_info;
}


