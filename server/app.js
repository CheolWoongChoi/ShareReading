
const path = require('path');
const app = require('./config/express')();
const passport = require('./config/passport')(app);

const auth = require('./routes/auth')(passport);
app.use('/api/auth', auth);

const home = require('./routes/home');
app.use('/api/home', home);

const mypage = require('./routes/mypage');
app.use('/api/mypage', mypage);

app.get('/api/sessionInfo', (req, res) => {   
   if(req.session.passport.user)
      res.send(req.session.passport.user);
   else{
      res.send(false);
   }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

app.listen(5000, () => {
   console.log("Server Listening 5000 port...");
});