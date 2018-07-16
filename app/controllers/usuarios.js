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
            },[]);

            res.json(servicos);

        });
    };

    return controller;    
}