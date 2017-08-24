const express = require('express');
const router = express.Router();

const User = require('../models/user.js')
const Gif = require('../models/gif.js')
const Music = require('../models/music.js')
const Lit = require('../models/lit.js')

// router.get('/', (req, res)=> {
//   User.collection.drop()
//   Gif.collection.drop()
//   Music.collection.drop()
//   Lit.collection.drop()
//   res.send('DAT DATA BEEN DROPPED')
// })

module.exports = router;
