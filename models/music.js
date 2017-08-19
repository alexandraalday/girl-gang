//dependencies
const mongoose = require('mongoose');

//schema
const musicSchema = mongoose.Schema({
 	name: String, 
 	artist: String,
	link: {type: String, required: true},
	embed: {type: String},
	tag: String,
	author: String
});

const User = mongoose.model('Music', musicSchema);


//export
module.exports = User;