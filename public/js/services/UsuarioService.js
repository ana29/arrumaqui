angular.module('arrumaqui')

.factory('UsuarioService', function($resource) {

    //Cria o resource com o nome da rota configurada 
    //em app/routes/profissinais.js
    return $resource('/api/profissionais/:id');
})