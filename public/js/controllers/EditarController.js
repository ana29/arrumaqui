angular.module('arrumaqui')

    .controller('EditarController', function ($scope, $rootScope, $location, EdicaoService) {
        $scope.nomeTela = 'Tela de Edição';
        $scope.verificaEmail = () => {
            if ($scope.email != null && $scope.senha != null) {
                EdicaoService.verificaEmail($scope.email, $scope.senha).then(
                    function (res) {

                        $location.path('/editar');
                    },
                    function (err) {
                        alert("Email ou senha incorreto(s)");
                    }
                );

            } else {
                alert("Erro");
            }
        };
        
    });
