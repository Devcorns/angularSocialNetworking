"use strict";
var mongoose = require("mongoose");
var returnSchema = new mongoose.Schema({
	name: {type:String, required:true},
    returnId: {type:String, default:Math.floor(1000000000 + Math.random() * 9000000000)},
	user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
	files:{
		fuv: {type:String, require:true},
		pdf: {type:String, required:true},
		receipt:String
	},
	desc: {type:String},
	assignee:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
	reports:[{
		subject:String,
		desc:String
	}],
	status: {
		currentStatus:{
			user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
			returnStatus:{type: mongoose.Schema.Types.ObjectId, ref: 'Returnstatus', default:'5a108ee7aada8929043ef6ca'},
			desc: { type:String },
			createdAt: { type: Date, default: new Date() }
		},
		allStatus:[{
			user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
			returnStatus:{type: mongoose.Schema.Types.ObjectId, ref: 'Returnstatus'},
			desc: {type:String},
			createdAt: { type: Date, default: new Date() }
		}]
	},
	deleted: Boolean,
	createdAt: { type: Date, default: new Date() }
});


returnSchema.set('toJSON', {
	transform: function (doc, data, options) {
		let date = new Date(data.createdAt);
		data.formatedDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
		return data;
	}
});


var Return = mongoose.model('Return', returnSchema);
exports.default = Return;
