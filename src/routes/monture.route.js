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

// Route pour mettre à jour la quantité d'une monture
MontureRouter.put('/:montureId/quantity',MontureController.updateQuantity);

// Route pour diminuer la quantité d'une monture (par exemple, lors d'une vente)
MontureRouter.post('/:montureId/decrease',MontureController.decreaseQuantity);

// Route pour augmenter la quantité d'une monture (par exemple, lors d'un nouvel arrivage)
MontureRouter.post('/:montureId/increase', MontureController.increaseQuantity);


module.exports = MontureRouter;
