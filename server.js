//dependencies
const express = require('express');
const port = process.env.PORT || 3000;
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const Strategy = require('passport-local').Strategy;
const router = express.Router();

//require middleware
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


// Server Configuration:
//  Passport server config==================================================>>>
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
			console.log('gonna get this shit going');
    });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

//========================================================================>>>>

//Create our new Express application

const app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(bodyParser.json({ type: '*/*'}));
app.use(express.static('public'));

//required for passport
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(session({ secret: 'readyplayeronegangstagirlswillalwaysmakeittotopofscoreboardandattainoverlordstatus' })); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session (e.g. user is now logged in)

//ROUTES=================================================================>>>>
require('./controllers/passport.js')(app, passport); //load our routes and pass in our app a fully configured passport


//========================================================================>>>>

//controllers
const user = require('./controllers/users.js')
app.use('/users', user)

const gif = require('./controllers/gif.js')
app.use('/gifs', gif)

const music = require('./controllers/music.js')
app.use('/music', music)

const lit = require('./controllers/lit.js')
app.use('/lit', lit)

//========================================================================>>>>

//index route
app.get('/', (req, res)=>{
	res.send('yeah boiiiiii');
});

//========================================================================>>>>

//mongoose connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/girlgang'
mongoose.connect(mongoUri);

//========================================================================>>>>

//port
app.listen(port, ()=>{
	console.log('listening bruh');
	console.log('passportJ server listening on: ', port);
	console.log('Server running on this port: ' + port);

});
