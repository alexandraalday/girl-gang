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
  Lit.create(req.body, (err, createdLit)=> { //req.body > req.params?
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
  Lit.findByIdAndUpdate(req.params.id, req.body, { new : true }, (err, updatedLit)=>{
    res.json(updatedLit)

  })
})

//delete route
router.delete('/:id', (req, res)=> {
  Lit.findByIdAndRemove(req.params.id, (err, deleteLit)=>{
    res.json(deleteLit)
  })
})

module.exports = router;
