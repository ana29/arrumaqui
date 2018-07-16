var app = angular.module('arrumaqui', ['ngRoute', 'ngResource', 'ngMessages', 'isteven-multi-select']);

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
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        })
        .when('/cadastrar', {
            templateUrl: 'partials/cadastro.html',
            controller: 'CadastroController'
        })
        .when('/servicos', {
            templateUrl: 'partials/servicos.html',
            controller: 'ServicosController'
        })
        .otherwise({
            redirectTo: '/'
        });
});