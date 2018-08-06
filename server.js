var http = require('http');
var app = require('./config/express')();
var mongoose = require('mongoose');
//require('./config/database.js')('mongodb://arrumaqui:les18.1rasgado@ds125851.mlab.com:25851/arrumaquidb');
require('./config/database.js')('mongodb://localhost:27017/arrumaquiDB');
http.createServer(app).listen(app.get('port'), function () {
    console.log("Servidor escutando na porta " + app.get('port'));
});