angular.module('arrumaqui')

.controller('ProfissionaisController', function($scope, ProfissionalService) {

    $scope.profissionais = [];

    $scope.filtro = '';

    $scope.mensagem = { texto: '' };

    let buscaProfissionais = () => {
        ProfissionalService.query((profissionais) => {
                $scope.profissionais = profissionais;
                $scope.mensagem = {};
            },

            //Callback de erro
            (erro) => {
                console.log("Não foi possível obter a lista de profissionais");
                console.error(erro);

                $scope.mensagem = {
                    texto: 'Não foi possível obter a lista de profissionais'
                };
            });
    };

    buscaProfissionais();

});