const express = require('express');
const Passport = require('passport');
const User = require('../models/user.js')
//const passport = express.Router()
const LocalStrategy = require('passport-local').Strategy;

module.exports = Passport
