const express = require('express');
const router = express.Router();
const User = require('../models/user.js')

//index route
router.get('/', (req, res)=> {
  User.find({}, (err, foundUsers)=> {
    res.json(foundUsers)
  })
})

//show route
router.get('/:id', (req, res)=> {
  User.find({ _id : req.params.id }, function(err, foundUser) {
    res.send(foundUser)
  })
})


//new route
router.post('/', (req, res)=> {
  User.create(req.body, (err, createdUser)=> { //req.body > req.params?
    res.json(createdUser)
  })
})
//edit route
router.put('/:id', (req, res)=> {
  User.findByIdAndUpdate(req.params.id, req.body, { new : true }, (err, updatedUser)=>{
    res.json(updatedUser)
  })
})

//delete route'
router.delete('/:id', (req, res)=> {
  User.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
    res.json(deletedUser)
  })
})

module.exports = router;
