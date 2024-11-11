const express = require('express');
const VenteRouter = express.Router();
const venteController = require('../database/controllers/vente.controller');

// Route pour créer une nouvelle vente
VenteRouter.post('/', venteController.creerVente);

// Route pour récupérer une vente par ID
VenteRouter.get('/:id', venteController.obtenirVenteParId);

// Route pour mettre à jour une vente par ID
VenteRouter.put('/:id', venteController.mettreAJourVente);

// Route pour supprimer une vente par ID
VenteRouter.delete('/:id', venteController.supprimerVente);

// Route pour récupérer toutes les ventes avec un filtre optionnel par statut de paiement
VenteRouter.get('/', venteController.obtenirToutesLesVentes);

module.exports = VenteRouter;
