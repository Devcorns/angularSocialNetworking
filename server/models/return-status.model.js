"use strict";
var mongoose = require("mongoose");
var returnStatusSchema = new mongoose.Schema({
	name: {type:String, required:true},
	value: Number,
	deleted: Boolean,
	createdAt: { type: Date, default: new Date() }
});



var ReturnStatus = mongoose.model('Returnstatus', returnStatusSchema);
exports.default = ReturnStatus;
