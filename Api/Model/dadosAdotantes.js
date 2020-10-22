const mongoose = require(`mongoose`);

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const dadosAdotantes = new mongoose.Schema({
    possuiPet: Boolean,
    ap_cs: String,
    janelasRede: Boolean,
    endereco: { type: Schema.Types.ObjectId, ref: 'Endereco' },
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model("DadosAdotantes", dadosAdotantes);
