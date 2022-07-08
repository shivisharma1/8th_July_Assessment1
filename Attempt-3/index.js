var express = require('express')
var app = express()
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/Registration.html');
});
console.log("Hosting on http://localhost:3000/")
app.listen(3000);
