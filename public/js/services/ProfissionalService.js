angular.module('arrumaqui')

.factory('ProfissionalService', function($resource) {

    //Cria o resource com o nome da rota configurada 
    //em app/routes/profissinais.js
    return $resource('/api/profissionais/:id');
})