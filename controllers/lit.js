const express = require('express');
const router = express.Router();
const Lit = require('../models/lit.js')

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
//edit route
router.put('/:id', (req, res)=> {
  Lit.findByIdAndUpdate(req.params.id, req.body, { new : true }, (err, updatedLit)=>{
    res.json(updatedLit)
  })
})

//delete route
router.delete('/:id', (req, res)=> {
  Lit.findByIdAndRemove(req.params.id, (err, deleteLit)=>{
    res.json(deletedLit)
  })
})

module.exports = router;
