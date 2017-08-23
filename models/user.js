
//dependencies
const mongoose = require('mongoose');
const Gif = require('./gif.js');
//schema
const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 	image: String,
	bio: String,
	gifs: [ Gif.schema ]
});

const User = mongoose.model('User', userSchema);


//export
module.exports = User;
