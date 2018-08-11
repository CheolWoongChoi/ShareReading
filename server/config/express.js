
module.exports = function(){

   const express = require('express');
   const app = express();
   const bodyParser = require('body-parser');
   const session = require('express-session');
   const db_info = require('./info/db_info');
   const session_info = require('./info/session_info')(db_info, session);

   app.use(bodyParser.json());
   
   //세션 환경 설정 후, express-session 연결
   app.use(session(session_info));

   return app;
}