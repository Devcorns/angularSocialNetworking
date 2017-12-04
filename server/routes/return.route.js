"use strict";
var express = require("express");
var router = express.Router();

var Auth = require('../controllers/auth.controller');
var auth = new Auth.default();

var returnController = require('../controllers/return.controller');
var returnCtrl = new returnController.default();

//Routes
router.route('/').post(auth.isClient, returnCtrl.insert);
router.route('/').put(auth.isClient, returnCtrl.update);
router.route('/').get(returnCtrl.get);

// For Vendor
router.route('/fatch-return').get(returnCtrl.fatchReturn);
router.route('/download-return').put(auth.isVendor, returnCtrl.downloadReturn);
router.route('/vendor-return').get(auth.isVendor, returnCtrl.vendorReturn);


exports.default = router;