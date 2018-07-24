angular.module('arrumaqui')

    .controller('EditarController', function ($scope, $rootScope, $location, EdicaoService, $localStorage) {

        $scope.servicosOfertados = [
            { nome: "Pedreiro(a)", ticked: false },
            { nome: "Marceneiro(a)", ticked: false },
            { nome: "Artesã(o)", ticked: false },
            { nome: "Encanador(a)", ticked: false },
            { nome: "Eletricista", ticked: false },
            { nome: "Diarista", ticked: false },
            { nome: "Técnico Informática", ticked: false },
            { nome: "Mecânico(a)", ticked: false }
        ];
        $scope.localLang = {
            selectAll: "Todos",
            selectNone: "Nenhum",
            reset: "Limpar",
            search: "Buscar...",
            nothingSelected: "Nenhum selecionado" //default-label is deprecated and replaced with this.
        }
        app.directive('passwordVerify', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, elem, attrs, ngModel) {
                    ngModel.$validators.myPwdInvalid = function (modelValue, viewValue) {
                        return viewValue === scope.$eval(attrs.passwordVerify);
                    };
                }
            };
        });
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
        $scope.editar = () => {
                           
            if ($scope.usuario.contato.email != null && $scope.usuario.senha != null) {
                EdicaoService.editar( $scope.usuario.nome, $scope.usuario.contato.email, $scope.usuario.senha ,$scope.usuario.nova_senha,$scope.usuario.idade,$scope.usuario.contato.telefone, $scope.usuario.contato.whatsapp, $scope.usuario.servicos).then(
                        function (res) {

                        console.log(res)

                        $localStorage.usuarioLogado = res;
                        $rootScope.usuarioLogado[0] = $localStorage.usuarioLogado;

                        alert("Dados Atualizados");
                        $location.path('/home');
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
