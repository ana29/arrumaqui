angular.module('arrumaqui')

.controller('UsuarioController', function($scope, $routeParams, UsuarioService) {
    console.log($routeParams.profissionalId);

    if ($routeParams.profissionalId) {
        UsuarioService.get({ id: $routeParams.profissionalId },

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
        $scope.mensagem = {
            texto: "Contato não existe"
        }
    }
});