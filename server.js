//dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cookieParser =  require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const port = process.env.PORT || 3000;
const User = require("./models/user.js")

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser())
app.use(require('express-session')({
	secret: 'our_secret',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())


//controllers
const user = require('./controllers/users.js')
app.use('/users', user)

const gif = require('./controllers/gif.js')
app.use('/gifs', gif)

const music = require('./controllers/music.js')
app.use('/music', music)

const lit = require('./controllers/lit.js')
app.use('/lit', lit)

const passportController = require('./controllers/passport.js')
app.use('/passport', passportController)


// passport config
const Poop = require('./models/user.js');
passport.use(new LocalStrategy(Poop.authenticate()));
passport.serializeUser(Poop.serializeUser());
passport.deserializeUser(Poop.deserializeUser());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//index route
app.get('/', (req, res)=>{
	res.send('yeah boiiiiii');
});


//mongoose connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/girlgang'
mongoose.connect(mongoUri);


//port
app.listen(port, ()=>{
	console.log('listening bruh');
	console.log('Server running on this port: ' + port);

});

module.exports = app;
