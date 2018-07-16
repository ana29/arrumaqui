//Controller para a entidade usuario
var jwt     = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports = function (app) {
    var Usuario = app.models.usuario;
    var controller = {};

    //Função que salva o usuario no bd 
    controller.salvaUsuario = (req, res) => {
        console.log('API: salvaUsuario');
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

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
        console.log('API: listaTodos');
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
        let criterio = { "contato.email": _emailUsuario};
        Usuario.find(criterio).exec()
            .then(function (usuario) {
                if (!usuario) throw new Error("Usuário não encontrado");
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
        let criterio = { "contato.email": _emailUsuario };
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

    //Função que retorna um usuário por id
    controller.obtemUsuarioPorId = function(req, res) {
        console.log('API: obtemUsuarioPorId');
        var _id = req.params.id;
        Usuario.findById(_id).exec()
            .then(
                function(usuario) {
                    if (!usuario) throw new Error("Usuário não encontrado");
                    res.json(usuario)
                },
                function(erro) {
                    console.log(erro);
                    res.status(404).json(erro)
                }
            ); 
    };

    controller.autenticaLogin = (req, res) => {
        console.log('API: autenticaLogin');
        let _emailUsuario = req.body.email;
        let _senha =req.body.senha
        let criterio = { "contato.email": _emailUsuario};

        Usuario.findOne(criterio).exec()
        .then(function (usuario) {

             if(!usuario) {
                 res.json({ success: false, message: 'Autenticação do Usuário falhou. Usuário não encontrado!' });
             } else if (usuario) {
                 //Aqui iremos verificar se a senha bate com o que está cadastrado no banco:
                 if(usuario.senha != _senha) {
                     res.json({ success: false, message: 'Autenticação do Usuário falhou. Senha incorreta!' });
                 } else {
                     // caso a senha do usuário seja encontrada.... iremos criar um token:
                     var token = jwt.sign(usuario, _senha, {
                    expiresIn: 60 * 24 // expires in 24 hours
                });

                     //Aqui iremos retornar a informação do token via JSON:
                     res.json({
                         success: true,
                         message: 'Token criado!!!',
                         toke: token
                     });
                 }
             }
        },
        function (erro) {
            console.log(erro);
            res.status(404).json(erro);
        }
    );



    }

    return controller;    
}