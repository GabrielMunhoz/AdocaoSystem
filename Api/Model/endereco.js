const mongoose = require(`mongoose`);

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const dadosAdotantes = new mongoose.Schema({
    rua: String,
    numero: Number,
    bairro: String,
    cep: String,
    cidade: String,
    complemento: String,
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Enderecos', dadosAdotantes);
