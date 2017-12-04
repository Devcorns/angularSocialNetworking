"use strict";
var jwt = require("jsonwebtoken");

function Auth() {
    
    this.isAdmin = function(req, res, next) {
        if(eval(req.user.role) === 1) next();
        else res.status(401).json({type:false, msg:"Unauthorized Access."}); 
    }

    this.isManager = function(req, res, next) {
        if(eval(req.user.role) === 2) next();
        else res.status(401).json({type:false, msg:"Unauthorized Access."}); 
    }

    this.isVendor = function(req, res, next) {
        if(eval(req.user.role) === 3) next();
        else res.status(401).json({type:false, msg:"Unauthorized Access."}); 
    }
    
    this.isClient = function(req, res, next) {
        if(eval(req.user.role) === 4) next();
        else res.status(401).json({type:false, msg:"Unauthorized Access."}); 
    }

    this.isAuthenticated = function(req, res, next) {
        if(req.user) next();
        else res.status(401).json({type:false, msg:"Unauthorized Access."}); 
    }

}

exports.default = Auth;