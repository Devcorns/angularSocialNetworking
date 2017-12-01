var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();



// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var router = express.Router();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

router.route('/register').post(function(req, res) {
    res.json(req.body);
});

app.use('/api', router);

// mongoose.connect('mongodb://localhost:27017/kbc', function(err) {
//     console.log(err);
//     console.log('Connected');
// });

// var UserSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });

// var user = mongoose.model('User', UserSchema);


// new user({
//     name: "Prakhar1 Mathur",
//     email: "itprakh1ar@gmail.com"
// }).save(function(err, user) {
//     if (err) console.error(err);
//     else console.log(user);
// });

app.listen(3000);