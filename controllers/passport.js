//there are 2 sets of routing code for passport. at bottom is a 2nd set which is commented out for reference (passport.authenticate as stock language may need to be used from this example)

const express = require('express');
const passport = require('passport');
const User = require('../models/user')
const morgan = require('morgan');
// const passport = express.Router();
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router()

router.get('/', (req, res)=> {
  res.render('index.ejs', { user : req.user })
})

router.get('/signup', (req, res) => {
  res.render('signup.ejs', { })
})

router.post('/signup', (req, res)=> {
    User.register(new User({ username : req.body.email }), req.body.password, (err, user)=> {
        if (err) {
            return res.render('signup', { user : user });
            console.log(err);
        }

        passport.authenticate('local')(req, res, ()=> {
            res.redirect('/');
        });
    });
});

router.get('/login', (req,res)=> {
  res.render('login.ejs', { user: req.user})
})

router.post('/login', passport.authenticate('local'), (req, res)=> {
  res.redirect('/')
})

//route to logout
router.get('/logout', (req, res)=> {
  req.logout()
  res.redirect('/')
})

//========================================================================>>>>
// ALTERNATE ROUTE CODING WE MAY NEED TO REFERENCE

// Define routes.
// app.get('/',
//
// app.get('/login',
//   function(req, res){
//     res.render('login');
//   });
//
// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });
//
// app.get('/logout',
//   function(req, res){
//     req.logout();
//     res.redirect('/');
//   });
//
// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('profile', { user: req.user });
//   });

//========================================================================>>>>

module.exports = router;
