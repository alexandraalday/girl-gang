//dependencies
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
//schema
const userSchema = mongoose.Schema({
 	name: String,
 	image: String,
	bio: String,
	author: []
});

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema);


//export
module.exports = User;
