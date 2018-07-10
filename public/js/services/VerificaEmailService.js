angular.module('arrumaqui')

.factory('VerificaEmailService', function($resource) {

    //Cria o resource com o nome da rota configurada 
    //em app/routes/cadastrar.js
    return $resource('/api/usuarios/getEmail/:email');
})