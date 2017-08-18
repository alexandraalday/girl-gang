const express = require('express');
const router = express.Router();
const Gif = require('../models/gif.js')

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
  Gif.create(req.body, (err, createdGif)=> { //req.body > req.params?
    res.json(createdGif)
  })
})
//edit route
router.put('/:id', (req, res)=> {
  User.findByIdAndUpdate(req.params.id, req.body, { new : true }, (err, updatedGif)=>{
    res.json(updatedGif)
  })
})

//delete route'
router.delete('/:id', (req, res)=> {
  User.findByIdAndRemove(req.params.id, (err, deleteGif)=>{
    res.json(deletedGif)
  })
})

module.exports = router;
