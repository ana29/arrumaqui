angular.module('arrumaqui')

.controller('UsuariosController', function($scope, CadastroService) {

    $scope.usuarios = [];

    $scope.filtro = '';

    $scope.mensagem = { texto: '' };

    let buscaUsuarios = () => {
        CadastroService.query((usuarios) => {
                $scope.usuarios = usuarios;
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

    buscaUsuarios();

});