var http = require('http');
var app = require('./config/express')();
var mongoose = require('mongoose');
require('./config/database.js')('mongodb://localhost:27017/arrumaquiDB');
http.createServer(app).listen(app.get('port'), function () {
    console.log("Servidor escutando na porta " + app.get('port'));
});
