//Rota para usuarios
module.exports = function(app) {

    let controller = app.controllers.usuarios;
    
    app.route('/api/usuarios')
        .post(controller.salvaUsuario)
        .get(controller.listaTodos);

    app.route('/api/usuarios/:email')
        .get(controller.obtemUsuarioComEmail)
        .delete(controller.removeUsuario);

}