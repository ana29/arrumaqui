var app = angular.module('arrumaqui', ['ngRoute', 'ngResource']);

app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        })
        .when('/profissionais', {
            templateUrl: 'partials/usuarios.html',
            controller: 'UsuariosController'
        })
        .when('/profissionais/:profissionalId', {
            templateUrl: 'partials/usuario.html',
            controller: 'UsuarioController'
        })
        .when('/login', {
            templateUrl: 'partials/login.html'
        })
        .when('/cadastrar', {
            templateUrl: 'partials/cadastro.html',
            controller: 'CadastroController'
        })
        .otherwise({
            redirectTo: '/'
        });
});