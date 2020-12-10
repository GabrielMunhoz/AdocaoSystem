const mongoose = require(`mongoose`);

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const pessoaSchema = new mongoose.Schema({
    nome: String,
    sobrenome: String,
    cpf: String,
    email: String,
    fone: String,
    senha: String,
    usuario: String,
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "admin"]
       },    
    endereco: { type: Schema.Types.ObjectId, ref: 'endereco' }
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Pessoa", pessoaSchema);
