const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const port = process.env.PORT || 3000
const app = express()



//controllers
const users = require('./controllers/users.js')
const poop = require('./controllers/passport.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('express-session')({
	secret: 'fuck you',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use('/passport', poop)

//passport congif
const User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//mongoose connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/girlgang'
mongoose.connect(mongoUri);


// catch 404 and forward to error handler
app.use((req, res, next)=> {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next)=> {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});






//port
app.listen(port, ()=>{
	console.log('listening bruh');
	console.log('Server running on this port: ' + port);

});
