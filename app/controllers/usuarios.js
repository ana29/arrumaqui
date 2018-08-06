//Controller para a entidade usuario
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports = function (app) {
    var Usuario = app.models.usuario;
    var controller = {};

    //Função que salva o usuario no bd
    controller.salvaUsuario = (req, res) => {
        console.log('API: salvaUsuario');
        var hashedPassword = bcrypt.hashSync(req.body.senha, 8);
        var usuario = new Usuario(req.body);

        usuario.senha = hashedPassword;

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
    };

    controller.atualizaUsuarioPorId = (req, res) => {
        console.log('API: atualizaUsuarioPorId');
        let _idUsuario = req.params.id;
        let criterio = { "_id": _idUsuario };
        let _nome = req.body.nome;
        let _email = req.body.email;
        let _senha = req.body.senha;
        let _novaSenha = req.body.novaSenha;
        let _novoTelefone = req.body.novoTelefone;
        let _novoWhats = req.body.novoWhatsapp;
        let _novaIdade = req.body.novaIdade;
        let _novosServicos = req.body.novosServicos;        
        
        Usuario.findById(criterio).exec()
            .then(function (usuario) {
                if (!usuario) {
                    res.status(401).json({ success: false, message: 'Usuário não encontrado' });
                } else if (usuario) {

                    if (usuario.contato.email === _email) {
                        bcrypt.compare(_senha, usuario.senha).then(function (passcheck) {
                            if (passcheck) {
                                var hashedPassword = bcrypt.hashSync(_novaSenha, 8);
                                usuario.senha = hashedPassword;

                                if ( _nome !== "") {
                                    usuario.nome = _nome;
                                }
                                if ( _novoWhats !== "") {
                                    usuario.contato.whatsapp = _novoWhats;
                                }

                                if ( _novoTelefone !== ""){
                                    usuario.contato.telefone = _novoTelefone;
                                }

                                if ( _novaIdade > usuario.idade && _novaIdade <= 70){
                                    usuario.idade = _novaIdade;
                                }

                                usuario.servicos = _novosServicos;

                                usuario.save(function (erro, usuario) {
                                    if (erro) {
                                        console.log(erro);
                                        res.status(401).json({ success: false, message: 'Erro ao atualizar senha' });
                                    } else {
                                        res.status(200).json(usuario);
                                    }
                                });
                            } else {
                                res.status(401).json({ success: false, message: 'Senha antiga incorreta' });
                            }
                        });
                    } else {
                        res.status(401).json({ success: false, message: 'Email incorreto' });
                    }
                }
            },
                function (erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };

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
        let criterio = { "contato.email": _emailUsuario };
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
    controller.obtemUsuarioPorId = function (req, res) {
        console.log('API: obtemUsuarioPorId');
        var _id = req.params.id;
        Usuario.findById(_id).exec()
            .then(
                function (usuario) {
                    if (!usuario) throw new Error("Usuário não encontrado");
                    res.json(usuario)
                },
                function (erro) {
                    console.log(erro);
                    res.status(404).json(erro)
                }
            );
    };

    // Vai mapear a pessoa para uma lista de serviços,
    //já como deve retornar para esta pessoa
    const mapPessoa = (pessoa) => {
        return pessoa.servicos.map(servico => {
            return {
                idPessoa: pessoa._id,
                nomePessoa: pessoa.nome,
                nomeServico: servico.nome,
                email: pessoa.contato.email,
                telefone: pessoa.contato.telefone,
                whatsapp: pessoa.contato.whatsapp
            }
        });
    }

    // Listagem a retornar da API
    controller.listaServicos = (req, res) => {
        Usuario.find({}, (erro, usuarios) => {

            if (erro) return res.status(400).json(erro);

            const servicos = usuarios.reduce((listagem, pessoa) => {
                const servicosPessoa = mapPessoa(pessoa);
                return listagem.concat(servicosPessoa);
            }, []);

            res.json(servicos);

        });
    };
   
    //Autentica Login 
    controller.autenticaLogin = (req, res, next) => {
        console.log('API: autenticaLogin');
        let _emailUsuario = req.body.email;
        let _senha = req.body.senha

        let criterio = { "contato.email": _emailUsuario };
        Usuario.findOne(criterio).then(function (usuario) {

            if (!usuario) {
                res.status(401).json({ success: false, message: 'Autenticação do Usuário falhou. Usuário não encontrado!' });
            } else if (usuario) {

                bcrypt.compare(_senha, usuario.senha).then(function (passcheck) {
                    if (passcheck) {
                        var token = jwt.sign(usuario, usuario.senha, {
                            expiresIn: 1440
                        });
                        res.status(200).json({
                            success: true,
                            message: 'Token criado!!!',
                            token: token
                        });
                    } else {
                        res.status(401).json({ success: false, message: 'Autenticação do Usuário falhou. ' });
                    }

                });

            }
        },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
        );
    }
    
    //Autentica usuario
    controller.autenticaUsuario = (req, res) => {
        console.log('API: autenticaUsuario');
        let _emailUsuario = req.body.email;
        let _senha = req.body.senha

        let criterio = { "contato.email": _emailUsuario };
        Usuario.findOne(criterio).then(function (usuario) {
            if (!usuario) {
                res.status(401).json({ success: false, message: 'Usuário não encontrado!' });
            } else if (usuario) {
                bcrypt.compare(_senha, usuario.senha).then(function (passcheck) {
                    if (passcheck) {
                        res.json(usuario)
                        res.status(200)
                    } else {
                        res.status(401).json({ success: false, message: 'Autenticação do Usuário falhou. ' });
                    }
                });
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
