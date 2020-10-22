const mongoose = require(`mongoose`);

var schema = mongoose.schema;

mongoose.Promise = global.Promise;

const dadosPets = new mongoose.Schema({
    vacinado: Boolean,
    castrado: Boolean,
    doenca: Boolean,
},
    {
        versionKey: false
    }
);

module.exports = mongoose.model("DadosPets", dadosPets);
