var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var fileUpload = require('express-fileupload');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
require('./config/passport.js')(passport);

app.use(session({
	secret: 'yowzah',
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');


//routes
require('./config/routes.js')(app, passport);

//launch
app.listen(port, function(){
	console.log('listening on port '+port);
});


exports = module.exports = app;
