angular.module('arrumaqui')

.controller('ProfissionalController', function($scope, $routeParams, ProfissionalService) {
    console.log($routeParams.profissionalId);

    if ($routeParams.profissionalId) {
        ProfissionalService.get({ id: $routeParams.profissionalId },

            (profissional) => {
                $scope.profissional = profissional;
            },

            (erro) => {
                $scope.mensagem = {
                    texto: "Contato não existe"
                };
                console.log(erro);
            }
        );
    } else {
        $scope.profissional = new ProfissionalService();
    }
})