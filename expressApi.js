var express = require("express");
var app = express();
var router = express.Router();

router.route('/login').get(function(req, res) {
    res.send('Hello')
});

app.listen(3000, err => {
    if (err) console.log(err);
    else console.log("Connected to port 3000")
});