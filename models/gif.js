//dependencies
const mongoose = require('mongoose');

//schema
const gifSchema = mongoose.Schema({
 	name: String,
 	image: String,
  tag: String,
  author: String
});

const Gif = mongoose.model('Gif', gifSchema);


//export
module.exports = Gif;
