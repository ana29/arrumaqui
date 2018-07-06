//Rota para profissionais
module.exports = function(app) {

    let controller = app.controllers.profissionais;

    app.route('/api/profissionais')
        .get(controller.listaProfissionais)
        .post(controller.salvaProfissional);

    app.route('/api/profissionais/:id')
        .get(controller.obtemProfissional)
        .delete(controller.removeProfissional);

}