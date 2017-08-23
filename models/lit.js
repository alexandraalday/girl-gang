//dependencies
const mongoose = require('mongoose');

//schema
const litSchema = mongoose.Schema({
 	postTitle: String,
  	author: String,
 	url: String,
  	tag: String,
  	description: String,
  	likes: {type: Number, default:0},
  	commentCount: {type: Number, default:0},
  	comments: [{type: String}]
});


const Lit = mongoose.model('Lit', litSchema);


//export
module.exports = Lit;
