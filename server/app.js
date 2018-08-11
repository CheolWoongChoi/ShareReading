
const path = require('path');
const app = require('./config/express')();
const passport = require('./config/passport')(app);


//인증(로그인 및 회원가입) API
const auth = require('./routes/auth')(passport);
app.use('/api/auth', auth);


//Home 화면 API
const home = require('./routes/home');
app.use('/api/home', home);


//Mypage 화면 API
const mypage = require('./routes/mypage');
app.use('/api/mypage', mypage);


//세션 유무 검사
app.get('/api/sessionInfo', (req, res) => {
    
   if(!req.session.passport){
       res.send(false);
   }
   else if(req.session.passport.user){
      res.send(req.session.passport.user);
   }
   else{
      res.send(false);
   }
});


//존재하지 않는 URL인 경우, 로그인 화면으로 이동
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});


app.listen(5000, () => {
   console.log("Share Reading Server Running...");
});