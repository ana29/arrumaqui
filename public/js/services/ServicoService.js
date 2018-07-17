angular.module('arrumaqui')

.factory('ServicoService', function($resource) {

    //Cria o resource com o nome da rota configurada 
    //em app/routes/cadastrar.js
    return $resource('/api/servicos');
});