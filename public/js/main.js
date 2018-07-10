var app = angular.module('arrumaqui', ['ngRoute', 'ngResource']);

app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        })
        .when('/profissionais', {
            templateUrl: 'partials/profissionais.html',
            controller: 'ProfissionaisController'
        })
        .when('/profissionais/:profissionalId', {
            templateUrl: 'partials/profissional.html',
            controller: 'ProfissionalController'
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