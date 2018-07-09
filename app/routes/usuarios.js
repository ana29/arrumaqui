//Rota para usuarios
module.exports = function(app) {

    let controller = app.controllers.usuarios;
    
    app.route('/api/usuario')
        .post(controller.salvaUsuario);




}