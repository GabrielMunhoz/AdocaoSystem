const mongoose = require(`mongoose`);

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const AdocaoSchema = new mongoose.Schema({
    datahora: Date,
    pet: { type: Schema.Types.ObjectId, ref: 'Pets' },
    adotante: { type: Schema.Types.ObjectId, ref: 'Pessoa' }
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Adocao", AdocaoSchema);
