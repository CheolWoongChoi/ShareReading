
const app = require('./config/express')();
const passport = require('./config/passport')(app);


const auth = require('./routes/auth')(passport);
app.use('/auth', auth);

const home = require('./routes/home');
app.use('/home', home);

app.get('/sessionInfo', (req, res) => {
   res.send(req.session.passport.user);
});

app.get('/', (req, res) => {
   res.send('WELCOME TO SR SERVER');
})

app.listen(5000, () => {
   console.log("Server Listening 5000 port...");
});