"use strict";
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
	role: {type:String, required:true},
	name: { type: String, required: true },
	email: { type: String, match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 'Please enter a valid email.'], required:true, unique:true},
	emailVerify: Boolean,
	emailVerifyKey: Number,
	phone: { type: String, match:[/^[1-9][0-9]{9}$/], required:true, unique:true},
	phoneVerify: Boolean,
	phoneVerifyKey: Number,
	gender: Number,
	username: { type: String, unique: true },
	hashed_password: { type: String },
	temporary_password: {type:String},
	dob: { type: Date },
	photograph: String,
	address: String,
	pincode:{ type: String, match:[/^[0-9]{6}$/]},
	status: { type: Boolean, default: true },
	deleted: Boolean,
	createdAt: { type: Date, default: new Date() }
});

userSchema.virtual('password').set(function (password) {
    this.hashed_password = bcrypt.hashSync(password, 10);
});

userSchema.pre('save', function (next) {
    this.username = this.name.replace(/[^A-Z0-9]/ig, "").toLowerCase() + Date.now();
    next();
});
userSchema.methods.comparePassword = function (candidatePassword, callback) {
	if(this.hashed_password) {
		if(bcrypt.compareSync(candidatePassword, this.hashed_password)) callback(false, null);
		else callback(true, null);
	} else if(this.temporary_password) {
		if(candidatePassword == this.temporary_password) callback(false, {temporary_password:1});
		else callback(true);
	}
};
userSchema.methods.emailverification = function (code, callback) {
	if(this.emailVerify) return callback(false, "Your email is already verified.");
	if(parseInt(code) === Math.abs(this.emailVerifyKey)) return callback(true, "Email verified successfully.");
	callback(false, "Wrong verification link.");
};
userSchema.methods.phoneverification = function (code, callback) {
	if(this.phoneVerify) return callback(false, "Your email is already verified.");
	if(parseInt(code) === this.phoneVerifyKey) return callback(true, "Phone verified successfully.");
	callback(false, "You've entered wrong otp.");
};
userSchema.methods.checkCode = function (code, callback) {
	if(parseInt(code) === Math.abs(this.emailVerifyKey)) return callback(false);
	callback(true);
};

userSchema.set('toJSON', {
	transform: function (doc, user, options) {
		delete user.hashed_password;
		delete user.emailVerifyKey;
		delete user.phoneVerifyKey;
		switch(eval(user.role)) {
			case 1:
			user.roleName = "Administrator"
			break;
			case 2:
			user.roleName = "Manager"
			break;
			case 3:
			user.roleName = "Vendor"
			break;
			case 4:
			user.roleName = "User"
			break;
		}
		if(user.gender == 1) user.gender = 'Male';
		else user.gender = 'Female';
		return user;
	}
});

var User = mongoose.model('User', userSchema);
exports.default = User;
