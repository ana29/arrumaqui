//Controller para a cadastro de usuario

let usuarios = [];

module.exports = function() {

  let controller = {};

  controller.salvaCadastro = (req, res) => {
      console.log('API: salvaCadastro');

      let usuario = req.body;

      res.json(usuario);
  }

  return controller;
}
