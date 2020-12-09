const express = require('express')
var cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const port = 3000
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
  var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'Não foi fornecido token' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Falha ao autenticar o token' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

const rotaPessoa = require('./Routes/pessoaRouter');
const rotaPets = require('./Routes/petsRouter');


app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

mongoose.connect('mongodb://localhost:27017/app_pessoa',{
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useFindAndModify:false
}).then ( ()=> {
  console.log('BD Conectado');
})
.catch( (error) =>{
  console.log('Erro ao conectar ao BD');
});

mongoose.Promise = global.Promise;

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function(){
//   console.log("Logado com sucesso");
// })

app.use((req,res,next) => {
  console.log("request Time: "+ Date.now());
  console.log("method "+ req.method);

  next();
})

app.use('/api/pessoa',rotaPessoa);
app.use('/api/pets',rotaPets);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})