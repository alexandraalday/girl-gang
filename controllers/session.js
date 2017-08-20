const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const mongoose = require('mongoose');
const passport = require('passport');


//to login
router.get('/login', (req, res)=> {
  passport.authenticate('local', function(err, user, info){
    const token = '';
    //If passport throws/catches an error
    if(err) {
      res.status(404).json(err)
      return;
    }
    //If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      //If user is not found
      res.status(404).json(info);
    }
  })(req, res);
})


//to register
router.get('/register', (req, res)=> {
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.image = req.body.image;
  user.bio = req.body.bio;

  user.setPassword(req.body.password);

  user.save(function(err) {
    const token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
});



//post to login


module.exports = router;
