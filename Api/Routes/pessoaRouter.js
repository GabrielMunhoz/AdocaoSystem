
const express = require('express');
const app  = require('../app');

const router = express.Router();
const pessoaController = require('../Controller/pessoaController');
const dadosAdotantesController = require('../Controller/dadosAdotantesController');
const enderecosController = require('../Controller/enderecosController');


router.get('/pessoas', app.verifyJWT ,pessoaController.grantAccess('readAny', 'pessoa'), pessoaController.listar);
router.post('/',app.verifyJWT, pessoaController.grantAccess('createAny', 'pessoa'),pessoaController.inserir);
router.post('/login', pessoaController.login);
router.get('/logout' ,pessoaController.logout);
router.put('/:id' ,app.verifyJWT,pessoaController.grantAccess('updateAny', 'pessoa'), pessoaController.atualizar);
router.get('/:id',app.verifyJWT, pessoaController.listarId);
router.delete('/:id',app.verifyJWT , pessoaController.grantAccess('deleteAny', 'pessoa'),pessoaController.deletar);


// Endereco

router.get("/", app.verifyJWT , enderecosController.grantAccess('readAny', 'endereco'), enderecosController.listar);
router.post('/enderecos/',app.verifyJWT, enderecosController.grantAccess('createAny', 'endereco') , enderecosController.inserir);
router.put('/enderecos/:id' ,app.verifyJWT, enderecosController.grantAccess('updateAny', 'endereco'), enderecosController.atualizar);
router.get('/enderecos/:id',app.verifyJWT, enderecosController.listarId);
router.delete('/enderecos/:id',app.verifyJWT ,enderecosController.grantAccess('deleteAny', 'endereco'), enderecosController.deletar);


//

// Dados Adotantes

router.get('/dadosAdotantes', app.verifyJWT , dadosAdotantesController.listar);
router.post('/dadosAdotantes/',app.verifyJWT,  dadosAdotantesController.inserir);
router.put('/dadosAdotantes/:id' ,app.verifyJWT, dadosAdotantesController.atualizar);
router.get('/dadosAdotantes/:id',app.verifyJWT, dadosAdotantesController.listarId);
router.delete('/dadosAdotantes/:id',app.verifyJWT , dadosAdotantesController.deletar);

//



module.exports = router;