const express = require('express');
const app  = require('../app');
const adocaoController = require('../Controller/AdocaoController');
const router = express.Router();


router.get('/', app.verifyJWT , adocaoController.grantAccess('readAny', 'adocao'), adocaoController.listar);
router.post('/', app.verifyJWT, adocaoController.grantAccess('createAny', 'adocao'), adocaoController.inserir);
router.put('/:id' ,app.verifyJWT,adocaoController.grantAccess('updateAny', 'adocao'), adocaoController.atualizar);
router.get('/:id',app.verifyJWT, adocaoController.listarId);
router.delete('/:id',app.verifyJWT , adocaoController.grantAccess('deleteAny', 'adocao'), adocaoController.deletar);

module.exports = router;