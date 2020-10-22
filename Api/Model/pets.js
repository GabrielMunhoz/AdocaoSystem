const mongoose = require(`mongoose`);

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const petsSchema = new mongoose.Schema({
    apelido: String,
    especie: String,
    raca: String,
    porte: String,
    idade: Number,
    genero: String,
    dadosPet: { type: Schema.Types.ObjectId, ref: 'DadosPets' }
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Pets", petsSchema);
