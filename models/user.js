//dependencies
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
//schema
const userSchema = mongoose.Schema({
 	name: {
      type: String,
      unique: true,
      required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
 	image: {
    String
  },
	bio: String,
	author: [],
  hash: String,
  salt: String
});
//when you set the password it will call this function to hash the password
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf25sync(password, this.salt, 1000, 64).toString('hex');
}
//function to check the password
userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf25sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
}
//method to return a jwt
userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate()+ 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    image: this.image,
    bio: this.bio,
    author: this.author,
    exp: parseInt(expiry.getTime() / 1000)
  }, "our_secret") //do not keep your secret in the code
}

const User = mongoose.model('User', userSchema);


//export
module.exports = User;
