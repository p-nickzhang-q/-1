var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', (req, res) => {
    var q = req.query.q;
    res.send(utility.md5(q));
})

app.listen(3000, (req, res) => {
    console.log('app is running at port 3000');
});