//Rota para usuarios
module.exports = function(app) {

    let controller = app.controllers.usuarios;
    
    app.route('/api/usuarios')
        .post(controller.salvaUsuario);

    app.route('/api/usuarios')
        .get(controller.listaTodos);

    app.route('/api/usuarios/:email')
        .get(controller.obtemUsuarioComEmail);
    
    app.route('/api/usuarios/:email')
        .delete(controller.removeUsuario);

}