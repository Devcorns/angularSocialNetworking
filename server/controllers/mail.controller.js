"use strict";
var express = require('express');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	host: "smtpout.secureserver.net",
	port: 25,
	auth: {
		user: "admin@happybazzar.com",
		pass: "9675487058"
	}
});

function mailController(){

	this.sendMail = function(data, call = null) {
		var mailOptions = {
			from: 'admin@happybazzar.com',
			to: data.email,
			subject: data.subject,
			html: data.html
		};
		transporter.sendMail(mailOptions, function(err, info){
			if (err && "function" == typeof call) return call(true);
			if(typeof "function" == call) {console.log('Mail sent'); call(false, info.response);}
		});
	}
}

exports.default = mailController;
