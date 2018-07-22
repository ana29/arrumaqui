angular.module('arrumaqui')

    .controller('ServicosController', function ($scope, ServicoService) {

        $scope.servicos = [];

        $scope.servicosOfertados = [
            { nome: "Pedreiro(a)"},
            { nome: "Marceneiro(a)"},
            { nome: "Artesã(o)"},
            { nome: "Encanador(a)"},
            { nome: "Eletricista"},
            { nome: "Diarista"},
            { nome: "Técnico Informática"},
            { nome: "Mecânico(a)"}
        ];

        let buscaServicos = () => {
            // query Faz um get no recurso api/servicos
            ServicoService.query((servicos) => {
                $scope.servicos = servicos;
                $scope.mensagem = {};
            },

                //Callback de erro
                (erro) => {
                    console.log("Não foi possível obter a lista de serviços");
                    console.error(erro);

                    $scope.mensagem = {
                        texto: 'Não foi possível obter a lista de serviços'
                    };
                });
        };

        buscaServicos();

        $scope.selecionaServico = (servico) => {
            $scope.selecionado = servico;
        };
    });
    