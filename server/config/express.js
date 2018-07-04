
module.exports = function(){

   const express = require('express');
   const app = express();
   const path = require('path');
   const bodyParser = require('body-parser');
   const session = require('express-session');
   const db_info = require('./info/db_info');
   const session_info = require('./info/session_info')(db_info, session);

   //app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());
   app.use(session(session_info));

   //client - static files
   app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
   app.use(express.static(path.join(__dirname, '/../../build')));
   

   return app;
}