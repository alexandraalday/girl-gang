//dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));


//controllers




//index route
app.get('/', (req, res)=>{
	res.send('yeah boiiiiii');
});





//mongoose connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/girlgang'

mongoose.connect(mongoUri);


//port
app.listen(port, ()=>{
	console.log('listening bruh');
});
