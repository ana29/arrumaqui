var express = require('express');

module.exports = function() {
    let app = express();

    //Variavel de ambiente acessivel em app.get('port)
    app.set('port', 3000);

    //middleware
    app.use(express.static('./public'));

    return app;
};