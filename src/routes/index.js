const express = require('express');
const ClubeController = require('../controllers/ClubeController');
const AtletaController = require('../controllers/AtletaController');
const CompeticaoController = require('../controllers/CompeticaoController');

const routes = express.Router();

routes.get('/', (req,res) => {
    res.send('Hello World').status(200);
})
//Rotas referentes a clubes
routes.get('/clubes', ClubeController.index);
routes.post('/clubes', ClubeController.store);
routes.put('/clubes/:id', ClubeController.update);
routes.delete('/clubes/:id', ClubeController.delete);

//Rotas referentes a atletas
routes.get('/atletas', AtletaController.index);
routes.post('/atletas', AtletaController.store);

//Rotas referentes a competiçao
    //Rotas referentes ao CRUD de competicao
    routes.get('/competicao', CompeticaoController.index);
    routes.post('/competicao', CompeticaoController.store);
    routes.put('/competicao/:id', CompeticaoController.update);
    routes.delete('/competicao/:id', CompeticaoController.delete);
    //Rotas referentes a exportacao do xlsx 
    routes.get('/competicao/xlsx', CompeticaoController.gerarXLSX);

//Rotas referentes a categorias
// routes.get('/categorias', CategoriaController.index);
// routes.post('/categorias', CategoriaController.store);
// routes.put('/categorias/:id', CategoriaController.update);
// routes.delete('/categorias/:id', CategoriaController.delete);


module.exports = routes;
