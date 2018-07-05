//Controller para a cadastro de usuario


let usuarios = [];

module.exports = function (app) {
  var Profissional = app.models.profissional;

  let controller = {};

  controller.salvaCadastroProfissional = (req, res) => {
    console.log('API: salvaCadastro');

    var profissional = new Profissional(req.body);

    profissional.save(function (erro, profissional) {
      if (erro) {
        res.status(500).end();
        console.log(erro)
      } else {
        res.json(profissional);
      }
    });


  }

  return controller;
}
