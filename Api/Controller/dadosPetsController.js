const dadosPets = require('../Model/dadosPets');
const jwt = require('jsonwebtoken');


exports.listar = (req,res) => {
    dadosPets.find({} , (err, dadosPet) =>{
        if (err){
            res.status(500).send(err);
        }
        res.json(dadosPet);
    });
    // res.json({id: 1, nome: 'gabriel', years : 21})
}

exports.inserir = (req,res) => {
    let novodadosPet = new dadosPets(req.body);    
    console.log(novodadosPet);

    novodadosPet.save((err, dadosPet) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(dadosPet);
        
    });
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let dadosPetAtualizar = req.body;
    dadosPets.findOneAndUpdate({ _id: id }, dadosPetAtualizar, { new: true }, (err, dadosPet) => {
        if(err){
            res.send(err);
        }
        res.json(dadosPet);
    });
}




exports.listarId = (req, res) => {
    let id = req.params.id;
    dadosPets.findById(id, (err, dadosPet) => {
        if(err)
            res.status(500).send(err);        
        res.json(dadosPet);
    });
}

exports.deletar =  (req, res) => {
    let id = req.params.id;
    dadosPets.findOneAndDelete({ _id: id }, (err, dadosPetAtual) => {
        if(err){
            res.send(err);
        }
        res.json(dadosPetAtual);
    });
  }