const adocao = require('../Model/adocao');


exports.listar = (req,res) => {
    adocao.find({} , (err, adocoes) =>{
        if (err){
            res.status(500).send(err);
        }
        res.json(adocoes);
    });
    // res.json({id: 1, nome: 'gabriel', years : 21})
}

exports.inserir = (req,res) => {
    let novaAdocao = new adocao(req.body);    
    console.log(novaAdocao);

    novaAdocao.save((err, adocao) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(adocao);
        
    });
}

// exports.atualizar = (req, res) => {
//     let id = req.params.id;
//     let dadosAdotanteAtualizar = req.body;
//     dadosAdotante.findOneAndUpdate({ _id: id }, dadosAdotanteAtualizar, { new: true }, (err, dadosAdotante) => {
//         if(err){
//             res.send(err);
//         }
//         res.json(dadosAdotante);
//     });
// }




exports.listarId = (req, res) => {
    let id = req.params.id;
    adocao.findById(id, (err, adocao) => {
        if(err)
            res.status(500).send(err);        
        res.json(adocao);
    });
}

exports.deletar =  (req, res) => {
    let id = req.params.id;
    adocao.findOneAndDelete({ _id: id }, (err, adocao) => {
        if(err){
            res.send(err);
        }
        res.json(adocao);
    });
  }