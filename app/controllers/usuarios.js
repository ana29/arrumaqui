//Controller para a entidade usuario

module.exports = function(app) {
    var Usuario = app.models.usuario;

    let controller = {};
    
    //Função que salva o usuario no bd 
    controller.salvaUsuario = (req, res) => {
        console.log('API: salvaUsuario');
    
        var usuario = new Usuario(req.body);
    
        usuario.save(function (erro, usuario) {
          if (erro) {
            res.status(500).json(erro).end();
            console.log(erro);
          } else {
            res.json(usuario);
            res.status(201);
            console.log(201);

          }
        });
    
    
      }

      


    //Função que retorna um usuario pelo ID
    controller.obtemUsuario = function(req, res) {
        let idUsuario = req.params.id;
        let usuario = usuarios.filter(function(usuario) {
            return usuario._id == idusuario;
        })[0];

        console.log('API: obtemUsuario');

        usuario ?
            res.json(usuario) :
            res.status(404).send('Contato não encontrado');
    };

    //Função que remove um usuario
    controller.removeUsuario = (req, res) => {
        console.log('API: removeUsuario');

        let idUsuario = req.params.id;

        usuarios = usuarios.filter((usuario) => {
            return usuario._id != idUsuario;
        });

        res.sendStatus(204).end();
    }

 


    return controller;
}