//Controller para a entidade usuario

module.exports = function (app) {
    var Usuario = app.models.usuario;
    var controller = {};

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

    //Função que lista Todos os usuarios do bd 
    controller.listaTodos = function (req, res) {
        Usuario.find().exec().then(
            function (usuario) {
                res.json(usuario);
                res.status(201);
                console.log(201);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };


    //Função que retorna um usuario pelo email
    controller.obtemUsuarioComEmail = function (req, res) {
        console.log('API: obtemUsuarioComEmail');
        let _emailUsuario = req.params.email;
        let criterio = { "email": _emailUsuario };
        Usuario.find(criterio).exec()
            .then(function (usuario) {
                if (!usuario) throw new Error("Contato não encontrado");
                res.json(usuario)
                res.status(201);
                console.log(usuario);
            },
                function (erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };

    //Função que remove um usuario
    controller.removeUsuario = (req, res) => {
        console.log('API: removeUsuario');

        let _emailUsuario = req.params.email;
        let criterio = { "email": _emailUsuario };
        Usuario.remove(criterio).exec()
            .then(
                function () {
                    res.end();
                },
                function (erro) {
                    return console.error(erro);
                }
            );
    };
    return controller;
}