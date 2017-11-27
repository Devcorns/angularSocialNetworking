var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
mongoose.connect('localhost:27017/signup');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

ap.use(bodyParser());

app.get('/test', function(req, res) {
    res.send('Hello');
})








app.listen(3000, function(err) {
    console.log("Connected to port 3000");

})