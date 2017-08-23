//dependencies
const mongoose = require('mongoose');

//schema
const gifSchema = mongoose.Schema({
 	name: String,
 	url: String,
  	tag: String,
  	likes: {type: Number, default:0},
  	author: String,
  	commentCount: {type: Number, default:0},
  	comments: [{type: String}]
});

const Gif = mongoose.model('Gif', gifSchema);


//export
module.exports = Gif;
