//dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

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
mongoose.connect('mongodb://localhost:27017/girlgang');
mongoose.connection.once('open', ()=>{
  console.log('mongoosin');
});


//port
app.listen(3000, ()=>{
	console.log('listening bruh');
});