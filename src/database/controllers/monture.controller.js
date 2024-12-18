const MontureService = require('../../services/monture.service');

class MontureController {
  // Créer une nouvelle monture
  async create(req, res) {
    try {
      const monture = await MontureService.createMonture(req.body);
      res.status(201).json(monture);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erreur lors de la création de la monture', error });
    }
  }

  // Récupérer toutes les montures
  async getAll(req, res) {
    try {
      const montures = await MontureService.getAllMontures();
      res.status(200).json(montures);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des montures', error });
    }
  }

  // Récupérer une monture par ID
  async getById(req, res) {
    try {
      const monture = await MontureService.getMontureById(req.params.id);
      if (!monture) {
        return res.status(404).json({ message: 'Monture non trouvée' });
      }
      res.status(200).json(monture);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de la monture', error });
    }
  }

  // Mettre à jour une monture par ID
  async update(req, res) {
    try {
      const monture = await MontureService.updateMonture(req.params.id, req.body);
      if (!monture) {
        return res.status(404).json({ message: 'Monture non trouvée' });
      }
      res.status(200).json(monture);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la monture', error });
    }
  }

  // Supprimer une monture par ID
  async delete(req, res) {
    try {
      const monture = await MontureService.deleteMonture(req.params.id);
      if (!monture) {
        return res.status(404).json({ message: 'Monture non trouvée' });
      }
      res.status(200).json({ message: 'Monture supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de la monture', error });
    }
  }

  // Contrôleur pour mettre à jour la quantité d'une monture
async  updateQuantity(req, res) {
  const { montureId } = req.params;
  const { newQuantity } = req.body;

  try {
    const monture = await montureService.updateQuantity(montureId, newQuantity);
    res.status(200).json(monture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Contrôleur pour diminuer la quantité (par exemple lors d'une vente)
async decreaseQuantity(req, res) {
  const { montureId } = req.params;
  const { amount } = req.body;

  try {
    const monture = await montureService.decreaseQuantity(montureId, amount);
    res.status(200).json(monture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Contrôleur pour augmenter la quantité (par exemple lors de la réception d'un nouvel arrivage)
async  increaseQuantity(req, res) {
  const { montureId } = req.params;
  const { amount } = req.body;

  try {
    const monture = await MontureService.increaseQuantity(montureId, amount);
    res.status(200).json(monture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
  

}

module.exports = new MontureController();
