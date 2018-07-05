//Rota para cadastro de usuario
module.exports = function(app) {

    let controller = app.controllers.cadastrar;

    app.route('/api/cadastrar')
        .post(controller.salvaCadastro);

}
