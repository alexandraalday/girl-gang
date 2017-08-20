const express = require('express');
const passport = require('passport');
const User = require('../models/user')
//const passport = express.Router()
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router()

router.get('/', (req, res)=> {
  res.render('index.ejs', { user : req.user })
})

router.get('/register', (req, res) => {
  res.render('register.ejs', { })
})

router.post('/register', (req, res)=> {
    User.register(new User({ username : req.body.email }), req.body.password, (err, user)=> {
        if (err) {
            return res.render('register', { user : user });
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


module.exports = router;
