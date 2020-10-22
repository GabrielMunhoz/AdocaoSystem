const dadosAdotante = require('../Model/dadosAdotantes');


exports.listar = (req,res) => {
    dadosAdotante.find({} , (err, dadosAdotante) =>{
        if (err){
            res.status(500).send(err);
        }
        res.json(dadosAdotante);
    });
    // res.json({id: 1, nome: 'gabriel', years : 21})
}

exports.inserir = (req,res) => {
    let novodadosAdotante = new dadosAdotante(req.body);    
    console.log(novodadosAdotante);

    novodadosAdotante.save((err, dadosAdotante) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(dadosAdotante);
        
    });
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let dadosAdotanteAtualizar = req.body;
    dadosAdotante.findOneAndUpdate({ _id: id }, dadosAdotanteAtualizar, { new: true }, (err, dadosAdotante) => {
        if(err){
            res.send(err);
        }
        res.json(dadosAdotante);
    });
}




exports.listarId = (req, res) => {
    let id = req.params.id;
    dadosAdotante.findById(id).populate('endereco').exec(
         (err, dadosAdotante) => {
        if(err)
            res.status(500).send(err);        
        res.json(dadosAdotante);
    });
}

exports.deletar =  (req, res) => {
    let id = req.params.id;
    dadosAdotante.findOneAndDelete({ _id: id }, (err, dadosAdotanteAtual) => {
        if(err){
            res.send(err);
        }
        res.json(dadosAdotanteAtual);
    });
  }