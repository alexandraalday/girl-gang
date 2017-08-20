//dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

//schema
const User = new Schema({
 	name: String,
  email: String,
  password: String,
 	image: String,
	bio: String,
	author: []
});

// User.plugin(passportLocalMongoose)

//export
module.exports = mongoose.model('User', User)
