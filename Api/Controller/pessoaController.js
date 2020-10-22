
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pessoa = require('../Model/pessoa');
const saltRounds = 10;
const myPlainTextPassword = 's0/\/\p4$$w0rD';
const someOtrherPlainTextPassword = 'not_bacon';



//Teste
const { roles } = require('../utils/roles');
 
exports.grantAccess = function(action, resource) {
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
 
// exports.allowIfLoggedin = async (req, res, next) => {
//  try {
//   const user = res.locals.loggedInUser;
//   if (!user)
//    return res.status(401).json({
//     error: "You need to be logged in to access this route"
//    });
//    req.user = user;
//    next();
//   } catch (error) {
//    next(error);
//   }
// }





//teste

exports.listar = (req,res) => {
    pessoa.find({} , (err, pessoas) =>{
        if (err){
            res.status(500).send(err);
        }
        res.json(pessoas);
    });
    // res.json({id: 1, nome: 'gabriel', years : 21})
}

exports.inserir = (req,res) => {
    let novaPessoa = new pessoa(req.body);    
    novaPessoa.role = req.body.role || 'basic';

    //codigo hash aqui
    const salt  = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(novaPessoa.senha, salt);
    novaPessoa.senha = hash;
    //

    let pDB = new pessoa();

    pessoa.findOne([usuario = novaPessoa.usuario], (err, pessoaBD) => {

        pDB = pessoaBD;
    })

    console.log("Pessoa nova = " + pDB)
    if(pDB != null){
        return res.status(500).json( message = "Erro, Usuario já registrado. ")
    }
    else 
     {
        novaPessoa.save((err, pessoa) => {
            if(err){
                res.send(err);
            }    
            res.status(201).json(pessoa);
            
        });
    }
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let pessoaAtualizar = req.body;

    const salt  = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pessoaAtualizar.senha, salt);
    pessoaAtualizar.senha = hash;

    pessoa.findOneAndUpdate({ _id: id }, pessoaAtualizar, { new: true }, (err, pessoa) => {
        if(err){
            res.send(err);
        }
        res.json(pessoa);
    });
}

exports.listarId = (req, res) => {
    let id = req.params.id;
    pessoa.findById(id).populate('dadosAdotante'). // only return the Persons name
    exec((err, pessoa) => {
        if(err)
            res.status(500).send(err);        
        res.json(pessoa);
    });
}

exports.deletar =  (req, res) => {
    let id = req.params.id;
    pessoa.findOneAndDelete({ _id: id }, (err, pessoaAtual) => {
        if(err){
            res.send(err);
        }
        res.json(pessoaAtual);
    });
  }

  exports.login = (req, res, next) => {
    if (req.query && req.body.usuario && req.body.senha){
        const parausername = req.body.usuario;
        const parasenha = req.body.senha;
        //
        const salt = bcrypt.genSaltSync(saltRounds);

        pessoa.findOne({usuario: parausername}, (err, pessoa) => {
            if(err){
                console.log('erro');
                res.status(500).json({err : err, message: "Falha ao realizar o login"});
            }
            const result = bcrypt.compareSync(parasenha, pessoa.senha);
            console.log('result' +result);
            if(result){
                console.log(pessoa);
                const id = pessoa.id; 
                const role = pessoa.role; 
                let token = jwt.sign({id}, process.env.SECRET, { expiresIn: 300})

                res.json({auth: true, token : token, role: role});
            }else  
            {
                res.json({auth: false, token : null, message: 'erro ao validar a senha'});
            } 
            });

    }
}
exports.logout = (req,res,next) => {
    res.json({auth: false, token : null});

}
