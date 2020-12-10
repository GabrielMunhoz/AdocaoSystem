const mongoose = require(`mongoose`);

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const AdocaoSchema = new mongoose.Schema({
    datahora: Date,
    Pet: { type: Schema.Types.ObjectId, ref: 'Pets' },
    Pessoa: { type: Schema.Types.ObjectId, ref: 'Pessoa' }
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Adocao", AdocaoSchema);
