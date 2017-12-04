'use strict';
var express = require('express');
var path = require('path');
var dotenv = require("dotenv");
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var indexRoutes = require('./routes/index.route');




var app = express();


dotenv.load({ path: '.env' });
app.use('/files', express.static(path.join(__dirname, '../files')));
app.use('/', express.static(path.join(__dirname, '../public/')));
app.use(bodyParser.json({limit: '5mb'}));
//app.use(bodyParser.urlencoded());

/**
 * @ Authorization
 */
app.use(function(req, res, next) {
	if(req.headers.authorization) {
		jwt.verify(req.headers.authorization, process.env.SECRET_TOKEN, function(err, decode){
			if(err) return res.status(400).json({type:false, msg:"Unauthorized Access."});
			require("./models/user.model").default.findById(decode.user._id, function(err, user){
				if(err || !user) return res.status(400).json({type:false, msg:"User does not exist."});
				req.user = user;
				next();
			});
		});
	} else {
		req.user = null
		next()
	};
});

app.set('port', (process.env.PORT || 3000));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');
mongoose.connection.on('error', console.error.bind(console, 'Database connection error.'));
mongoose.connection.once('open', function(){
	console.log('Connected to mongodb.');
	indexRoutes.default(app);
	app.get('/*', function(req, res){
		res.sendFile(path.join(__dirname, '../public/index.html'));
	});
	app.listen(app.get('port'), function(){
		console.log('Server listening on port ' + app.get('port'));
	});
});

