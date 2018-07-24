//Rota para usuarios
module.exports = function (app) {

    let controller = app.controllers.usuarios;

    app.route('/api/usuarios')
        .post(controller.salvaUsuario)
        .get(controller.listaTodos);

    app.route('/api/usuarios/getEmail/:email')
        .post(controller.autenticaUsuario)
        .get(controller.obtemUsuarioComEmail)
        .delete(controller.removeUsuario);

    app.route('/api/usuarios/email')
        .post(controller.autenticaUsuario)

    app.route('/api/usuarios/:id')
        .get(controller.obtemUsuarioPorId)
        .post(controller.atualizaUsuarioPorId);

    app.route('/api/servicos')
        .get(controller.listaServicos);

    app.route('/api/login')
        .post(controller.autenticaLogin);
}
