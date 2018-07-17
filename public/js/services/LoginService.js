angular.module('arrumaqui')

.factory('LoginService', function($resource, $rootScope, $localStorage, $location) {

    //Cria o resource com o nome da rota configurada 
    //em app/routes/usuarios.js
    //return $resource('/api/login');

    let LoginResource = $resource('/api/login');
    let serviceObject = {
        loginUser: function(userName, password) {
            return LoginResource.save({}, {
                email: userName,
                senha: password
            })
            .$promise;
        },
        logout: function() {
            delete $rootScope.token;
            delete $rootScope.usuarioLogado;
            delete $localStorage.token;
            delete $localStorage.usuarioLogado;
        }
    };
    return serviceObject;
});
