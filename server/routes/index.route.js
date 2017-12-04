var express = require('express');
var router = express.Router();



//Routes
var userRoutes = require('./user.route');
var returnRoutes = require('./return.route');

// controllers
var indexController = require('../controllers/index.controller');

function indexRoutes(app) {

	// Index Routes
	var indexCtrl = new indexController.default();
	router.route('/').get(indexCtrl.home);
	router.route('/image-upload').post(indexCtrl.imageUpload);
	router.route('/file-upload').post(indexCtrl.fileUpload);

	//User routes
	router.use('/user', userRoutes.default);

	//return routes
	router.use('/return', returnRoutes.default);

	// Root routes
	app.use('/api', router);
}

exports.default = indexRoutes;