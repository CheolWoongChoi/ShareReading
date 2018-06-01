
const app = require('./config/express')();
const passport = require('./config/passport')(app);

const auth = require('./routes/auth')(passport);
app.use('/auth', auth);

app.get('/sessionInfo', (req, res) => {
   res.send(req.session.passport.user);
});


app.listen(5000, () => {
   console.log("Server Listening 5000 port...");
});