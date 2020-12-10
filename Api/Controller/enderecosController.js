const endereco = require('../Model/endereco');
const jwt = require('jsonwebtoken');


//Teste
const { roles } = require('../utils/roles');

exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.headers['role'])[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "Você não tem permissão para executar está ação"
                });
            }
            next()
        } catch (error) {
            res.status(401).json("Algo deu errado na role")
        }
    }
}

exports.listar = (req,res) => {
    console.log("Cheguei aqui")
    endereco.find({} , (err, end) =>{
        if (err){
            console.log(err)
            res.status(500).send(err);
        }
        res.json(end);
    });
    // res.json({id: 1, nome: 'gabriel', years : 21})
}

exports.inserir = (req,res) => {
    let novoendereco = new endereco(req.body);    
    console.log(novoendereco);

    novoendereco.save((err, endereco) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(endereco);
        
    });
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let enderecoAtualizar = req.body;
    endereco.findOneAndUpdate({ _id: id }, enderecoAtualizar, { new: true }, (err, endereco) => {
        if(err){
            res.send(err);
        }
        res.json(endereco);
    });
}

exports.listarId = (req, res) => {
    let id = req.params.id;
    endereco.findById(id, (err, endereco) => {
        if(err)
            res.status(500).send(err);        
        res.json(endereco);
    });
}

exports.deletar =  (req, res) => {
    let id = req.params.id;
    endereco.findOneAndDelete({ _id: id }, (err, enderecoAtual) => {
        if(err){
            res.send(err);
        }
        res.json(enderecoAtual);
    });
  }