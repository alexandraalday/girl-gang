const express = require('express');
const router = express.Router();
const Gif = require('../models/gif.js')
const User = require('../models/user.js')

//index route
router.get('/', (req, res)=> {
  Gif.find({}, (err, foundGifs)=> {
    res.json(foundGifs)
  })
})

//show route
router.get('/:id', (req, res)=> {
  Gif.find({ _id : req.params.id }, function(err, foundGif) {
    res.send(foundGif)
  })
})


//new route
router.post('/', (req, res)=> {
  req.body.author = req.session.email;
  Gif.create(req.body, (err, createdGif)=>{
      User.findOneAndUpdate(
        {email: req.session.email},
        {$push: {gifs: createdGif}},
        {safe: true, upsert: true, new: true},
        (err, model)=>{
          console.log(err);
        })
        res.json(createdGif)
    })
})

//like route
router.put('/like/:id', (req, res)=>{
  Gif.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}} ,(err, foundGif) => {
    res.json(foundGif)
  })
})

//up vote comment route
router.put('/comment/up/:id', (req, res)=>{
  Gif.findByIdAndUpdate(req.params.id, {$inc: {commentCount: 1}}, (err, updatedGif) => {
    res.json(updatedGif)
  })
})

//new comment route
router.put('/comment/:id', (req, res)=>{
  Gif.findByIdAndUpdate(req.params.id, {$push: {comments: req.body.comments}}, (err, updatedGif) => {
    res.json(updatedGif)
  })
})


//edit route
router.put('/:id', (req, res)=> {
  //need to wrap this all in an if statement to check if they are the user that created this gif
  //if(req.body.author === req.session.email)
  Gif.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedGif)=> {
    User.findOneAndUpdate(
      { email: req.session.email},
      { $set: { gifs: updatedGif}},
      { safe: true, upsert: true, new: true },
      (err, model)=> {
        console.log(err);
      })
      res.json(updatedGif)
  })
})

//delete route'
router.delete('/:id', (req, res)=> {
  Gif.findByIdAndRemove(req.params.id, (err, deletedGif)=>{
    res.json(deletedGif)
  })
})

module.exports = router;
