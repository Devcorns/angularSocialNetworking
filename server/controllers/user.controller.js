"use strict";
var express = require('express');
var jwt = require("jsonwebtoken");
var userModel = require("../models/user.model");
var bcrypt = require("bcryptjs");

var mailController = require('./mail.controller');
var mailCtrl = new mailController.default();

var smsController = require('./sms.controller');
var SMS = new smsController.default();

function userController(){
	var model = userModel.default;


	this.register = function(req, res) {
		req.body.emailVerifyKey = Math.abs(Math.floor(100000 + Math.random() * 900000));
		req.body.phoneVerifyKey = Math.abs(Math.floor(100000 + Math.random() * 900000));
		req.body.photograph = 'files/no-avatar.jpg';
		req.body.temporary_password = Math.floor(100000 + Math.random() * 900000);		
		new model(req.body).save(function(err, user) {
			if (err) return res.status(400).json(err);
			res.json({ type: true, user: user });
			console.log("Welcome "+user.name+", <br> Here are your login credentials:- <br> User ID:"+user.username+"<br> Temporary Password:"+req.body.temporary_password);
			console.log("OTP: "+req.body.phoneVerifyKey);
			SMS.send({
				to:"91"+req.body.phone,
				text:"Welcome "+user.name+" Your OTP is "+req.body.phoneVerifyKey
			});
			mailCtrl.sendMail({
				email: req.body.email,
				subject: "Registration Successfull",
				html: "Welcome "+user.name+", <br> Here are your login credentials:- <br> User ID:"+user.username+"<br> Temporary Password:"+req.body.temporary_password
			});
		});
	}

	this.login = function(req, res){
		model.findOne({$or: [{email:req.body.email}, {username:req.body.email}, {phone: req.body.email}]}, function(err, user){
			if(err) return res.status(400).send(err);
			if(!user) return res.status(400).json({type:false, msg:"Your username or password is invalid."});
			user.comparePassword(req.body.password, function(err){
				if(err) return res.status(400).json({type:false, msg:"Your username or password is invalid."});
				var token = jwt.sign({ user: user }, process.env.SECRET_TOKEN);
				res.json({token:token, user:user});
			});
		})
	}
	this.token = function(req, res){
		jwt.verify(req.body.token, process.env.SECRET_TOKEN, function(err, decode){
			if(err) return res.status(400).send('Invalid Token');
			res.json({token:req.body.token, user:decode.user});
		});
	}

	this.tokenReset = function(req, res) {
		jwt.verify(req.body.token, process.env.SECRET_TOKEN, function(err, decode){
			if(err) return res.status(400).send('Invalid Token');
			model.findOne({_id:decode.user._id}, function(err, user){
				if(err) return res.status(400).send(err);
				var token = jwt.sign({ user: user }, process.env.SECRET_TOKEN);
				res.json({token: token, user: user});
			});
		});
	}
	this.update = function(req, res) {
		console.log(req.user._id);
		model.findById(req.user._id, function(err, user){
			if(err) return res.status(400).json({type:false, msg:"User can't be update."});
			req.body.user.temporary_password = "";
			Object.assign(user, req.body.user);
			user.save(function(err, u) {
				if(err) return res.status(400).send(err);
				res.json({type:true, token:jwt.sign({ user: user }, process.env.SECRET_TOKEN), user:u});
			});
		})
	}
	this.emailVerify = function(req, res) {
		model.findOne({_id:req.body.id}, function(err, user){
			if(err) return res.status(400).send('User does not exists.');
			if(!user) return res.status(400).send('User does not exists.');
			user.emailverification(req.body.code, function(done, msg){
				if(!done) return res.status(400).send(msg);
				model.findOneAndUpdate({_id:req.body.id}, {emailVerify:1, emailVerifyKey:0}, {}, function(err, d){
					if(err) return res.status(400).send('Email has not verified.');
					res.send(msg);
				});
			});
		});
	}
	this.otpVerify = function(req, res) {
		model.findOne({_id:req.body.user._id}, function(err, user) {
			if(err || !user) return res.status(400).json({type:false, msg:'User does not exists.'});
			user.phoneverification(req.body.otp, function(done, message) {
				if(!done) return res.status(400).json({type:false, msg:message});
				model.findOneAndUpdate({_id:req.body.user._id}, {phoneVerify:1, phoneVerifyKey:0}, {}, function(err, d) {
					if(err) return res.status(400).json({type:false, msg:"Phone can not be verified. Please go to profile the resend the otp."});
					res.json({type:true, message:message});
				});
			});
		});
	}
	this.otpResend = function(req, res) {
		let phoneVerifyKey = Math.abs(Math.floor(100000 + Math.random() * 900000));
		SMS.send({
			to:"91"+req.body.user.phone,
			text:"Your OTP is "+phoneVerifyKey
		}, function(err, info) {
			if(err) res.status(400).json({type:false, msg:"OTO can not be sent."});
			model.findOneAndUpdate({_id:req.body.user._id}, {phoneVerifyKey:phoneVerifyKey}, {}, function(err, d) {
				if(err) return res.status(400).json({type:false, msg:"OTP can not be resend."});
				console.log(phoneVerifyKey);
				res.json({type:true});
			});
		});
		
	}

	this.requestForgot = function(req, res) {
		const emailVerifyKey = Math.abs(Date.now());
		model.findOneAndUpdate({email:req.body.email}, {emailVerifyKey:emailVerifyKey}, {}, function(error, user){
			if(error) return res.status(400).send('User does not exists.');
			if(!user) return res.status(400).send('This email is not registerd with us.');
			console.log(process.env.BASE_URL+'user/forgot-password/'+user._id+'/'+emailVerifyKey);
			mailCtrl.sendMail({
				email: req.body.email,
				subject: "Forgot Password",
				html: "Dear "+user.name+", <a href='"+process.env.BASE_URL+'user/forgot-password/'+user._id+'/'+emailVerifyKey+"'>Click to forgot reset your password.</a>"
			}, function(err, sent) {
				if(err) return res.status(400).send('Mail not sent.');
				res.send("We have sent you a url to forgot your password in your mail.");
			});
		});
	}
	this.forgotPassword = function(req, res) {
		model.findOne({_id:req.body.id}, function(err, user){
			if(err) return res.status(400).send('This link is wrong.');
			if(!user) return res.status(400).send('This link is wrong.');
			user.checkCode(req.body.code, function(err){
				if(err) return res.status(400).send("This link is wrong.");
				model.findOne({_id:req.body.id}, function(err, u){
					if(err) return res.status(400).send("This link is wrong.");
					u.set({emailVerifyKey:0, password:req.body.password});
					u.save(function(err, user){
						if(err) return res.status(400).send('Password has not changed. Please try again.');
						res.send('Password has changed.');
					});
				});
			});
		});
	}

	this.get = function(req, res) {
		/**
		 * @params
		 */
		let sort = (req.query.sort) ? req.query.sort : 'asc';
		let limit = (req.query.limit) ? eval(req.query.limit) : 100;
		
		model.find({})
		.sort({createdAt: sort})
		.limit(limit)
		.exec(function(err, data){
			if(err) return res.status(400).json({type:false, msg:"Can not fatch members."});
			res.json(data);
		});
	}

	this.table = function(req, res) {
		res.json([
      {
        "shiftDate": "17-July-2017",
        "swipeIn": "10:00 AM",
        "swipeOut": "06:00 PM",
        "duration": "8 Hours",
        "status": "PRESENT"

      },
      {
        "shiftDate": "16-July-2017",
        "swipeIn": "9:00 AM",
        "swipeOut": "5:00 AM",
        "duration": "7 Hours",
        "status": "PRESENT"
	  },
      {
        "shiftDate": "17-July-2017",
        "swipeIn": "9:00 AM",
        "swipeOut": "5:00 AM",
        "duration": "7 Hours",
        "status": "ABC"
      }
	  

    ]);
	}

}

exports.default = userController;
