const express = require('express');
const router = express.Router();
const Music = require('../models/music.js')

//index route
router.get('/', (req, res)=> {
  Music.find({}, (err, foundMusic)=> {
    res.json(foundMusic)
  })
})

//show route
router.get('/:id', (req, res)=> {
  Music.find({ _id : req.params.id }, function(err, foundMusic) {
    res.send(foundMusic)
  })
})

//new route
router.post('/', (req, res)=> {
  Music.create(req.body, (err, createdMusic)=> { 
    res.json(createdMusic)
  })
})

//like route
router.put('/like/:id', (req, res)=>{
  Music.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}} ,(err, foundSong) => {
    res.json(foundSong)
  })
})

//edit route
router.put('/:id', (req, res)=> {
  Music.findByIdAndUpdate(req.params.id, req.body, { new : true }, (err, updatedMusic)=>{
    res.json(updatedMusic)
  })
})

//delete route'
router.delete('/:id', (req, res)=> {
  Music.findByIdAndRemove(req.params.id, (err, deletedMusic)=>{
    res.json(deletedMusic)
  })
})



module.exports = router;
