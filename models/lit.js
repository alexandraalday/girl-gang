//dependencies
const mongoose = require('mongoose');

//schema
const litSchema = mongoose.Schema({
 	postTitle: String,
  author: String,
 	url: String,
  comment: String,
  tag: String
});

const Lit = mongoose.model('Lit', litSchema);


//export
module.exports = Lit;
