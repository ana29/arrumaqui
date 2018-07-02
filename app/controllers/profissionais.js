//Controller para a entidade Profissional

//Contador para ID em memoria (apenas para testes iniciais)
let ID_PROFISSIONAL_INC = 3;

//Lista de profissionais em memoria
let profissionais = [{
        '_id': 1,
        'nome': 'Profissional 1',
        'email': 'profissional1@gmail.com',
        'cidade': 'Campina Grande',
        'estado': 'Paraíba',
        'bairro': 'Bodocongó',
        'servicos': [
            { 'servico_id': 1 },
            { 'servico_id': 3 },
            { 'servico_id': 6 }
        ]
    },
    {
        '_id': 2,
        'nome': 'Profissional 2',
        'email': 'profissional2@gmail.com',
        'cidade': 'Campina Grande',
        'estado': 'Paraíba',
        'bairro': 'Liberdade',
        'servicos': [
            { 'servico_id': 9 },
            { 'servico_id': 2 },
            { 'servico_id': 5 }
        ]
    },
    {
        '_id': 3,
        'nome': 'Profissional 3',
        'email': 'profissional3@gmail.com',
        'cidade': 'Queimadas',
        'estado': 'Paraíba',
        'bairro': 'Ligeiro',
        'servicos': [
            { 'servico_id': 4 },
            { 'servico_id': 7 },
            { 'servico_id': 8 }
        ]
    }
];

module.exports = function() {

    let controller = {};

    //Função que retorna a lista de profissionais
    controller.listaProfissionais = function(req, res) {
        res.json(profissionais);
        console.log('API: listaProfissionais')
    };

    //Função que retorna um profissional pelo ID
    controller.obtemProfissional = function(req, res) {
        let idProfissional = req.params.id;
        let profissional = profissionais.filter(function(profissional) {
            return profissional._id == idProfissional;
        })[0];

        console.log('API: obtemProfissional');

        profissional ?
            res.json(profissional) :
            res.status(404).send('Contato não encontrado');
    };

    //Função que remove um profissional
    controller.removeProfissional = (req, res) => {
        console.log('API: removeProfissional');

        let idProfissional = req.params.id;

        profissionais = profissionais.filter((profissional) => {
            return profissional._id != idProfissional;
        });

        res.sendStatus(204).end();
    }

    //Função que salva um profissional
    controller.salvaProfissional = (req, res) => {
        console.log('API: salvaProfissional');

        let profissional = req.body;

        profissional = profissional._id ? atualiza(profissional) : adiciona(profissional);

        res.json(profissional);
    }

    let adiciona = (profissionalNovo) => {
        profissionalNovo._id = ++ID_PROFISSIONAL_INC;
        profissionais.push(profissionalNovo);
        return profissionalNovo;
    }

    let atualiza = (profissionalAlterar) => {
        profissionais = profissionais.map((profissional) => {
            if (profissional._id == profissionalAlterar._id) {
                profissional = profissionalAlterar;
            }

            return profissional;
        });

        return profissionalAlterar;
    }

    return controller;
}