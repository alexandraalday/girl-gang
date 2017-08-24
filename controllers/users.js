const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
//will we need to require other models here also?
//for ex: const Lit = require('../models/lit.js')

//index route
router.get('/', (req, res)=> {
  User.find({}, (err, foundUsers)=> {
    res.json(foundUsers)
  })
})

//route to check to see if logged in
router.get('/checkLogin', (req, res)=> {
  if(req.session.logged){
    User.findOne({email: req.session.email}, (err, user)=>{
      res.json(user)
    })
  } else {
          req.session.message = "email or password are incorrect"
      //dont know if this line is right/necessary
      res.json(req.session.message)
  }
})



//Post route to register a new user
router.post('/register', (req, res)=> {
  //hash the password
  const password = req.body.password
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  //create an obect for db entry
  const userDbEntry = {};
  userDbEntry.email = req.body.email;
  userDbEntry.password = passwordHash;
  //put password into db
  User.create(userDbEntry, (err, user)=> {
    //set up session here so we can use same we did for the login
    req.session.message = '';
    req.session.email = user.email;
    req.session.logged = true;
    //instead of res.redirect send the user via json
    res.json(req.session.logged)
  })
})


//Post route to login
router.post('/login', (req, res)=> {
  User.findOne({email: req.body.email}, (err, user)=> {
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.message = ''
        req.session.email = req.body.email
        req.session.logged = true

        // res.send(req.session.logged)
        res.json(req.session.logged)
      } else {
        req.session.message = "email or password are incorrect"
        //dont know if this line is right/necessary
        res.json(req.session.message)
      }
    } else {
      req.session.message = "email or password are incorrect"
      //dont know if this line is right/necessary
      res.json(req.session.message)
    }
  })
})

//Route to logout
router.get('/logout', (req, res)=> {
  req.session.destroy(function(err){
    req.session = false;
    console.log('succesfully logged out');
    res.json(req.session)
  })
})

//show route
router.get('/:id', (req, res)=> {
  User.find({ _id : req.params.id }, function(err, foundUser) {
    res.json(foundUser)
  })
})

//the register route replaces this route
//new route
// router.post('/', (req, res)=> {
//   User.create(req.body, (err, createdUser)=> { //req.body > req.params?
//     res.json(createdUser)
//   })
// })



//edit route
router.get('/checkLogin', (req, res)=> {
  if(req.session.logged){
    User.findOne({email: req.session.email}, (err, user)=>{
      res.json(updatedUser)
    })
  } else {
    console.log('get user modal info');
  }
})

router.put('/checkLogin', (req, res)=> {
  if(req.session.logged){
  User.findByIdAndUpdate(req.params.id, req.body, { new: true },

    (err, user)=>{
      console.log('use profile updated');
    res.json(updatedUser)
  })
  } else {
    console.log('user added profile data info in their modal');
  }
})





//delete route'
router.delete('/:id', (req, res)=> {
  User.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
    res.json(deletedUser)
  })
})

module.exports = router;
