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
const user = require('./controllers/users.js')
app.use('/users', user)

const gif = require('./controllers/gif.js')
app.use('/gifs', gif)

const music = require('./controllers/music.js')
app.use('/music', music)

const lit = require('./controllers/lit.js')
app.use('/lit', lit)

const session = require('./controllers/session.js')
app.use('/session', session)



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
	console.log('Server running on this port: ' + port);

});
