﻿require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secretString, resave: false, saveUninitialized: true }));

// using JWT auth to secure the api
// unless for mentioning the otherwise case
app.use('/api', expressJwt({ secret: config.secretString }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// start server
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Server listening at port :::: ' + server.address().port);
});
