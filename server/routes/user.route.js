"use strict";
var express = require("express");
var router = express.Router();

var Auth = require('../controllers/auth.controller');
var auth = new Auth.default();

var userController = require('../controllers/user.controller');
var userCtrl = new userController.default();

//Routes
router.route('/register').post(userCtrl.register);
router.route('/otp-verify').post(userCtrl.otpVerify);
router.route('/otp-resend').post(userCtrl.otpResend);

router.route('/login').post(userCtrl.login);
router.route('/token').post(userCtrl.token);
router.route('/token-reset').post(userCtrl.tokenReset);
router.route('/update').post(userCtrl.update);
router.route('/email-verify').post(userCtrl.emailVerify);
router.route('/request-forgot').post(userCtrl.requestForgot);
router.route('/forgot-password').post(userCtrl.forgotPassword);

router.route('/get').get(auth.isAdmin, userCtrl.get);
router.route('/table').get(auth.isAdmin, userCtrl.table);

exports.default = router;