//Rota para cadastro de usuario
module.exports = function(app) {

    let controller = app.controllers.cadastrar;

    app.route('/api/cadastrarProfissional')
        .post(controller.salvaCadastroProfissional);

}
