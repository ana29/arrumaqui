var app = angular.module('arrumaqui', ['ngRoute',
    'ngResource',
    'ngMessages',
    'isteven-multi-select',
    'ngStorage']);

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
        .when('/verificaEmail', {
            templateUrl: 'partials/verificaEmail.html',
            controller: 'EditarController'
        })
        .when('/servicos', {
            templateUrl: 'partials/servicos.html',
            controller: 'ServicosController'
        })
        .when('/editar', {
            templateUrl: 'partials/editar.html',
            controller: 'EditarController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.run(($rootScope, $location, $localStorage) => {
    $rootScope.token = $localStorage.token;

    let rotasBloqueadasNaoLogado = ['/editar', '/verificaEmail'];
    let rotasBloqueadasLogado = ['/cadastrar', '/login'];

    $rootScope.$on('$locationChangeStart', () => {
        if ($rootScope.token == null &&
            rotasBloqueadasNaoLogado.indexOf($location.path()) != -1) {
            $location.path('/login');
        }
    });

    $rootScope.$on('$locationChangeStart', () => {
        if ($rootScope.token != null &&
            rotasBloqueadasLogado.indexOf($location.path()) != -1) {
            $location.path('/home');
        }
    });

});
