//dependencies
const mongoose = require('mongoose');

//schema
const musicSchema = mongoose.Schema({
	link: {type: String, required: true},
	embed: {type: String},
	tag: String,
	author: String
});

const User = mongoose.model('Music', musicSchema);


//export
module.exports = User;