//Controller para a cadastro de usuario


let usuarios = [];

module.exports = function (app) {
  var Usuario = app.models.usuario;

  let controller = {};

  controller.salvaCadastro = (req, res) => {
    console.log('API: salvaCadastro');

    var usuario = new Usuario(req.body);

    usuario.save(function (erro, usuario) {
      if (erro) {
        res.status(500).end();
        console.log(erro)
      } else {
        res.json(usuario);
      }
    });


  }

  return controller;
}
