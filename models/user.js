
//dependencies
const mongoose = require('mongoose');
const Gif = require('./gif.js');
const Lit = require('./lit.js')
const Music = require('./music.js')
//schema
const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 	image: String,
	bio: String,
	gifs: [Gif.schema],
  music: [Music.schema],
  lit: [Lit.schema]
});

const User = mongoose.model('User', userSchema);


//export
module.exports = User;
