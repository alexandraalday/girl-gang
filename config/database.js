
//========================================================================>>>>
// config/database.js
module.exports = {

//mongoose connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/girlgang'
mongoose.connect(mongoUri);

};

//========================================================================>>>>









// from node authentication set up site
// // config/database.js
// module.exports = {
//
//     'url' : 'your-settings-here' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
//
// };
