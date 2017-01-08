var express = require('express');
var app = express();
var port = process.env.PORT;


app.listen(port, ()=>console.log('Running on ' + port));