angular.module('arrumaqui')

.controller('LoginController', function($scope, LoginService, $localStorage, $sessionStorage) {
    
    $scope.login.email = '';
    $scope.login.senha = '';

    $scope.login = () => {
        
    }
});