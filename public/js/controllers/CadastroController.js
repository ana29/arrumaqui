angular.module('arrumaqui')

.controller('CadastroController', function($scope, CadastroService) {

    $scope.usuario = new CadastroService();

    $scope.cadastrar = () => {
        $scope.usuario.$save()

        .then(() => {
                $scope.mensagem = { texto: "Salvo com sucesso" };
                $scope.usuario = new CadastroService();
            })
            .catch((erro) => {
                $scope.mensagem = { texto: "Não foi possível salvar" };
            });
    }
});