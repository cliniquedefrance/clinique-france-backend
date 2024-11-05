const express = require('express');
const MontureController = require('../database/controllers/monture.controller');

const MontureRouter = express.Router();

// Route pour créer une nouvelle monture
MontureRouter.post('/', MontureController.create);

// Route pour récupérer toutes les montures
MontureRouter.get('/', MontureController.getAll);

// Route pour récupérer une monture par ID
MontureRouter.get('/:id', MontureController.getById);

// Route pour mettre à jour une monture par ID
MontureRouter.put('/:id', MontureController.update);

// Route pour supprimer une monture par ID
MontureRouter.delete('/:id', MontureController.delete);

// Route pour toggler la disponibilité en stock d'une monture
MontureRouter.put('/:id/toggle-stock', MontureController.toggleStock);


module.exports = MontureRouter;
