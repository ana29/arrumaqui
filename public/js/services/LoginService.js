angular.module('arrumaqui')

.factory('LoginService', function($resource) {

    //Cria o resource com o nome da rota configurada 
    //em app/routes/cadastrar.js
    return $resource('/api/login');
})