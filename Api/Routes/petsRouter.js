
const express = require('express');
const app  = require('../app');

const router = express.Router();
const petsController = require('../Controller/petsController');
const dadosPetsController = require('../Controller/dadosPetsController');
const pessoaController = require('../Controller/pessoaController')

router.get('/', app.verifyJWT , pessoaController.grantAccess('readAny', 'pets'), petsController.listar);
router.post('/', app.verifyJWT, pessoaController.grantAccess('createAny', 'pets'), petsController.inserir);
router.put('/:id' ,app.verifyJWT,pessoaController.grantAccess('updateAny', 'pets'), petsController.atualizar);
router.get('/:id',app.verifyJWT, petsController.listarId);
router.delete('/:id',app.verifyJWT , pessoaController.grantAccess('deleteAny', 'pets'), petsController.deletar);

//Dados Pets

router.get('/dadosPets/', app.verifyJWT , dadosPetsController.listar);
router.post('/dadosPets/', app.verifyJWT, dadosPetsController.inserir);
router.put('/dadosPets/:id' ,app.verifyJWT, dadosPetsController.atualizar);
router.get('/dadosPets/:id',app.verifyJWT, dadosPetsController.listarId);
router.delete('/dadosPets/:id',app.verifyJWT , dadosPetsController.deletar);

//


module.exports = router;