const pets = require('../Model/pets');
const dadosPets = require('../Model/dadosPets');
const jwt = require('jsonwebtoken');


exports.listar = (req,res) => {
    pets.find({} , (err, pet) =>{
        if (err){
            res.status(500).send(err);
        }
        res.json(pet);
    });
    // res.json({id: 1, nome: 'gabriel', years : 21})
}

exports.inserir = (req,res) => {
    let novoPet = new pets(req.body);    
    console.log(novoPet);

    novoPet.save((err, pet) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(pet);
        
    });
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let petAtualizar = req.body;
    pets.findOneAndUpdate({ _id: id }, petAtualizar, { new: true }, (err, pet) => {
        if(err){
            res.send(err);
        }
        res.json(pet);
    });
}




exports.listarId = (req, res) => {
    let id = req.params.id;
    pets.findById(id).populate('dadosPet')
    .exec( (err, pet) => {
        if(err)
            res.status(500).send(err);        
        res.json(pet);
    });
}

exports.deletar =  (req, res) => {
    let id = req.params.id;
    pets.findOneAndDelete({ _id: id }, (err, petAtual) => {
        if(err){
            res.send(err);
        }
        res.json(petAtual);
    });
  }