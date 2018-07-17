angular.module('arrumaqui')

.factory('UsuarioService', function($resource) {

    //Cria o resource com o nome da rota configurada 
    //em app/routes/usuarios.js
    return $resource('/api/usuarios/:id');
})