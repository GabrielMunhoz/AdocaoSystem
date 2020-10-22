const mongoose = require(`mongoose`);

var schema = mongoose.schema;

mongoose.Promise = global.Promise;

const enderecoSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Endereco", enderecoSchema);
