const adocao = require('../Model/adocao');
const pets = require('../Model/pets');


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

exports.listar = (req, res) => {
    adocao.find({}, (err, adocoes) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(adocoes);
    });
    // res.json({id: 1, nome: 'gabriel', years : 21})
}

exports.inserir = (req, res) => {
    let novaAdocao = new adocao(req.body);
    console.log(req.body);
    console.log(novaAdocao);

    if (novaAdocao.Pet) {

        let p;

        pets.findById(novaAdocao.Pet).exec((err, pet) => {
                if (err)
                    res.status(500).send(err);
                p = pet;

                if (p) {
                    p.adotado = true;
        
                    pets.findOneAndUpdate({ _id: p._id }, p, { new: true }, (err, pet) => {
                        if (err) {
                            res.send(err);
                        }
        
                        p = pet;
                    });
                }

            });

        

    }

    novaAdocao.save((err, adocao) => {
        if (err) {
            res.send(err);
        }
        res.status(201).json(adocao);

    });
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let dadosAdotanteAtualizar = req.body;
    dadosAdotante.findOneAndUpdate({ _id: id }, dadosAdotanteAtualizar, { new: true }, (err, dadosAdotante) => {
        if (err) {
            res.send(err);
        }
        res.json(dadosAdotante);
    });
}

exports.listarId = (req, res) => {

    let id = req.params.id;
    adocao.findById(id).populate(['Pessoa', 'Pet']).exec((err, adocao) => {
        if (err)
            res.status(500).send(err);
        res.json(adocao);
    });
}

exports.deletar = (req, res) => {
    let id = req.params.id;



    adocao.findOneAndDelete({ _id: id }, (err, adocao) => {
        if (err) {
            res.send(err);
        }
        if (adocao) {

            let p;
    
            pets.findById(adocao.Pet).exec((err, pet) => {
                    if (err)
                        res.status(500).send(err);
                    p = pet;
    
                    if (p) {
                        p.adotado = false;
            
                        pets.findOneAndUpdate({ _id: p._id }, p, { new: true }, (err, pet) => {
                            if (err) {
                                res.send(err);
                            }
            
                            p = pet;
                        });
                    }
    
                });
    
            
    
        }

        res.json(adocao);
    });
}