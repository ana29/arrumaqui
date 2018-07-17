var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        senha: {
            type: String,
            required: true
        },
        idade: {
            type: Number,
            required: true
        },
        contato: {
            telefone: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            whatsapp: {
                type: String
            }
        },
        servicos: {
            /*nome: {
                type: [String],
                required: true,
                enum: ['Pedreiro(a)', 'Marceneiro(a)', 'Artesã(o)', 'Encanador(a)', 'Eletricista', 'Diarista', 'Técnico Informática', 'Mecânico(a)']
            }*/
            type: Object,
            required: true
        }

    });
      
    return mongoose.model('Usuario', schema);

};
