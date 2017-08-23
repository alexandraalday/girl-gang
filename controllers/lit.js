const express = require('express');
const router = express.Router();
const Lit = require('../models/lit.js')
const User = require('../models/user.js')

//index route for Lit = literature content
router.get('/', (req, res)=> {
  Lit.find({}, (err, foundLits)=> {
    res.json(foundLits)
  })
})

//show route
router.get('/:id', (req, res)=> {
  Lit.find({ _id : req.params.id }, function(err, foundLit) {
    res.send(foundLit)
  })
})

//new route
router.post('/', (req, res)=> {
  req.body.author = req.session.email;
  Lit.create(req.body, (err, createdLit)=> {
      User.findOneAndUpdate(
        {email: req.session.email},
        {$push: {lit: createdLit}},
        {safe: true, upsert: true, new: true},
        (err, model)=> {
          console.log(err);
        })
        res.json(createdLit)
  })
})

//like route
router.put('/like/:id', (req, res)=>{
  Lit.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}} ,(err, foundLit) => {
    res.json(foundLit)
  })
})

//up vote comment route
router.put('/comment/up/:id', (req, res)=>{
  Lit.findByIdAndUpdate(req.params.id, {$inc: {commentCount: 1}}, (err, updatedLit) => {
    res.json(updatedLit)
  })
})

//new comment route
router.put('/comment/:id', (req, res)=>{
  Lit.findByIdAndUpdate(req.params.id, {$push: {comments: req.body.comments}}, (err, updatedLit) => {
    res.json(updatedLit)
  })
})

//edit route
router.put('/:id', (req, res)=> {
  //need to add a conditional that will only let you edit the lit you authored
  Lit.findByIdAndUpdate(req.params.id, req.body, { new : true }, (err, updatedLit)=>{
    User.findOneAndUpdate(
      { email: req.session. email},
      { $set: { lit: updatedLit}},
      { safe: true, upsert: true, new: true},
      (err, model)=> {
        console.log(err);
      })
    res.json(updatedLit)
  })
})

//delete route
router.delete('/:id', (req, res)=> {
  //need to create a conditional to only be able to delete if you authored it
  Lit.findByIdAndRemove(req.params.id, (err, deletedLit)=>{
    User.findOne({ email: req.session.email},
    (err, foundUser)=> {
      foundUser.lit.id(req.params.id).remove();
      foundUser.save((err, data)=> {
        res.json(deletedLit)
      })
    })
  })
})

module.exports = router;
