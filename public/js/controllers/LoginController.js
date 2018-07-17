angular.module('arrumaqui')

.controller('LoginController', function($scope, $rootScope, LoginService, $localStorage, $location, VerificaEmailService) {

    $scope.login = () => {

        if ($scope.email != null && $scope.senha != null) {

			LoginService.loginUser($scope.email, $scope.senha).then(
                function(res) {
                    VerificaEmailService.query({email: $scope.email},
                        (profissional) => {
                            $localStorage.usuarioLogado = profissional;
                            $rootScope.usuarioLogado = $localStorage.usuarioLogado;
                            alert("Bem vindo, " + $rootScope.usuarioLogado[0].nome);
                        },
                        (erro) => {
                            $scope.mensagem = {
                                texto: "Contato não existe"
                            };
                            console.log(erro);
                        }
                    )
                    
                    
                    $localStorage.token = res.token;
                    $rootScope.token = $localStorage.token;
                    $location.path('/');
                    console.log(res);
                    
                },
                function(err) {
                    alert("Email ou senha incorreto(s)");
                    console.error(err);
                }
            )
			
		} else {
			alert("Erro");
		}

    };

    $rootScope.token = $localStorage.token;
    
});
