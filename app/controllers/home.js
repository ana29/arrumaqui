module.exports = function() {
    let controller = {};

    //Funcao que renderiza a pagina index
    //Funcao chamada em routes/home.js
    controller.index = function(req, res) {
        res.render('index', { nome: 'ArrumAqui' });
    };

    return controller;
}