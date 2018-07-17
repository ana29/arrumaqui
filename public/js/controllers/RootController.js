angular.module('arrumaqui')

.controller('RootController', function($scope, $rootScope, LoginService, $location, $localStorage) {
    $scope.logout = () => {
        LoginService.logout();
        $location.path('/login');
    }

    $rootScope.usuarioLogado = $localStorage.usuarioLogado;
});
