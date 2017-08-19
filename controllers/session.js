const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

router.get('/', (req, res)=> {
  res.send('welcome to the dark side')
})


module.exports = router;
