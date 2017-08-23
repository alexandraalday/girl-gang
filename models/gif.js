//dependencies
const mongoose = require('mongoose');

//schema
const gifSchema = mongoose.Schema({
 	url: String,
  	tag: String,
  	likes: {type: Number, default:0},
  	author: {type:String, default: ''},
  	commentCount: {type: Number, default:0},
  	comments: [{type: String}]
});

const Gif = mongoose.model('Gif', gifSchema);


//export
module.exports = Gif;
