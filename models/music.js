//dependencies
const mongoose = require('mongoose');

//schema
const musicSchema = mongoose.Schema({
 	name: String, 
 	artist: String,
	link: String,
	tag: String,
	author: String
});

const User = mongoose.model('Music', musicSchema);


//export
module.exports = User;