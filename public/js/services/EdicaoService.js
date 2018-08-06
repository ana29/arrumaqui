angular.module('arrumaqui')

.factory('EdicaoService', function($resource, $rootScope) {
   let VerificaEmailResource = $resource('/api/usuarios/email');
   let EditarCadastro = $resource('/api/usuarios/:id',{ id: $rootScope.usuarioLogado[0]._id });
   let serviceObject = {
        verificaEmail: function(email, senha) {
            return VerificaEmailResource.save({}, {
                email: email,
                senha: senha
            })
            .$promise;
        },
        editar: function(nome,email,senha, nova_senha,idade, whatsapp ,telefone,servicos) {
            return EditarCadastro.save({}, {
                nome:nome,
                email:email,
                senha:senha,
                novaSenha:nova_senha,
                novaIdade:idade,
                novoWhatsapp:whatsapp,
                novoTelefone:telefone,
                novosServicos:servicos

            }).$promise;
    
        }

    };
    return serviceObject;

});
