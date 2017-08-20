//dependencies
const mongoose = require('mongoose');

//schema
const litSchema = mongoose.Schema({
 	postTitle: String,
 	url: String,
  comment: String
});

const Lit = mongoose.model('Lit', litSchema);


//export
module.exports = Lit;
