
const app = require('./config/express')();
const passport = require('./config/passport')(app);


const auth = require('./routes/auth')(passport);
app.use('/auth', auth);

const home = require('./routes/home');
app.use('/home', home);

const mypage = require('./routes/mypage');
app.use('/mypage', mypage);

app.get('/sessionInfo', (req, res) => {   
   if(req.session.passport.user)
      res.send(req.session.passport.user);
   else{
      res.send(false);
   }
});

app.get('/', (req, res) => {
   res.send('WELCOME TO SR SERVER');
})

app.listen(5000, () => {
   console.log("Server Listening 5000 port...");
});