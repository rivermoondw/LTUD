var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

//routes
require('./config/routes.js')(app);

//launch
app.listen(port, function(){
	console.log('listening on port '+port);
});


exports = module.exports = app;