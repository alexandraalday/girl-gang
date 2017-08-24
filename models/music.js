//dependencies
const mongoose = require('mongoose');

//schema
const musicSchema = mongoose.Schema({
	link: {type: String, required: true},
	embed: {type: String},
	tag: String,
	likes: {type: Number, default:0},
	author: {type:String, default: ''},
	commentCount: {type: Number, default:0},
	comments: [{type: String}]
});

const Music = mongoose.model('Music', musicSchema);


//export
module.exports = Music;