//dependencies
const mongoose = require('mongoose');

//schema
const musicSchema = mongoose.Schema({
 	name: String, 
 	artist: String,
 	album: String,
	year: Date,
	author: []
});

const User = mongoose.model('Music', musicSchema);


//export
module.exports = User;