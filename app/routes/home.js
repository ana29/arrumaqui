module.exports = (app) => {
    //Vai procurar diretamente na instancia do express
    //passaa como parametro. Pasta app/controllers/home
    let controller = app.controllers.home;
    //Funcao de controllers/home passada como parametro
    app.get('/', controller.index);
}