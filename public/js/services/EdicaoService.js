angular.module('arrumaqui')

.factory('EdicaoService', function($resource) {
   let VerificaEmailResource = $resource('/api/usuarios/email');
   let serviceObject = {
        verificaEmail: function(email, senha) {
            return VerificaEmailResource.save({}, {
                email: email,
                senha: senha
            })
            .$promise;
        }
    };

    return serviceObject;

});
