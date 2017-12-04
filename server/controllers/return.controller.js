"use strict";
var Model = require("../models/return.model");
var StatusModel = require('../models/return-status.model').default;

var mailController = require('./mail.controller');
var mailCtrl = new mailController.default();

var smsController = require('./sms.controller');
var SMS = new smsController.default();

function returnController(){
	var model = Model.default;
    
    this.insert = function(req, res) {
        req.body.user = req.user._id;
        new model(req.body).save(function(err, data) {
            if(err) return res.status(400).json({type:false, msg:err});
            res.json({type:true, msg:data});
        });
    }

    this.update = function(req, res) {
        model.findById(req.query._id, function(err, data){
            if(err || !data) return res.status(400).json({type:false, msg:(err) ? err : "Data not found"});
            Object.assign(data, req.body);
            data.save(function(err, data){
                if(err) return res.status(400).json({type:false, msg:err});
                res.json({type:true, msg:"Return has been updated successfully.", data:data});
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
        .populate(["user", "status.currentStatus.returnStatus"])
		.sort({createdAt: sort})
		.limit(limit)
		.exec(function(err, data){
			if(err) return res.status(400).json({type:false, msg:"Can not fatch data.", err:err});
			res.json(data);
		});
    }

    this.fatchReturn = function(req, res) {
        model.find({$or: [
            {assignee: {$exists: false}},
            {assignee: null}
        ]})
        .limit(20)
        .exec((err, data) => {
            if(err) return res.status(400).json({type:false, msg:"Can not fatch data.", err:err});
            res.json(data);
        });
    }

    this.downloadReturn = (req, res) => {
        model.findById(req.body._id, (err, data) => {
            if(err) return res.status(400).json({type:false, err:"Return can not be asign to you. Please contact Administrator.", err:err});
            data.assignee = req.user._id;
            data.status.currentStatus = {
                user: req.user._id,
                returnStatus: '5a108f988143ac3688a20c50'
            };
            data.status.allStatus.push(data.status.currentStatus);
            data.save((err, d) => {
                if(err) return res.status(400).json({type:false, err:"Return can not be asign to you. Please contact Administrator.", err:err});
                res.json(d);
            });
        });
    }

    this.vendorReturn = (req, res) => {
        let data = this.getData({
            sort: 'desc',
            populate: ['user', 'status.currentStatus.returnStatus'],
            where: {
                assignee: req.user._id
            }
        }, (err, data) => {
            if(err) return {type:false, msg:"Can not fatch data.", err:err};
            res.json(data);
        });
    }

    this.getData = (filter, callback) => {
        /**
		 * @params
		 */
		let sort = (filter.sort) ? filter.sort : 'asc';
        let limit = (filter.limit) ? filter.limit : 100;
        let populate = (filter.populate) ? filter.populate : ['user'];
        let where = (filter.where) ? filter.where : {};
		
        return model.find(where)
        .populate(populate)
		.sort({createdAt: sort})
		.limit(limit)
		.exec(callback);
    }

}

exports.default = returnController;
