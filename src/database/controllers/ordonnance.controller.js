const { ordonnanceOphtaService } = require('../../services/ordonnance.service');

const ordonnanceOphtaController = {
  // Créer une nouvelle ordonnance
  async createOrdonnance(req, res) {
    try {
      const ordonnance = await ordonnanceOphtaService.createOrdonnance(req.body);
      res.status(201).json(ordonnance);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Récupérer une ordonnance par son ID
  async getOrdonnanceById(req, res) {
    try {
      const ordonnance = await ordonnanceOphtaService.getOrdonnanceById(req.params.id);
      if (!ordonnance) {
        return res.status(404).json({ message: 'Ordonnance non trouvée' });
      }
      res.json(ordonnance);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Récupérer toutes les ordonnances pour un patient spécifique
  async getOrdonnancesByPatient(req, res) {
    try {
      const ordonnances = await ordonnanceOphtaService.getOrdonnancesByPatient(req.params.patientId);
      res.json(ordonnances);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Récupérer toutes les ordonnances globalement
  async getAllOrdonnances(req, res) {
    try {
      const ordonnances = await ordonnanceOphtaService.getAllOrdonnances();
      res.json(ordonnances);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Mettre à jour une ordonnance par son ID
  async updateOrdonnance(req, res) {
    try {
      const ordonnance = await ordonnanceOphtaService.updateOrdonnance(req.params.id, req.body);
      if (!ordonnance) {
        return res.status(404).json({ message: 'Ordonnance non trouvée' });
      }
      res.json(ordonnance);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Supprimer une ordonnance par son ID
  async deleteOrdonnance(req, res) {
    try {
      const ordonnance = await ordonnanceOphtaService.deleteOrdonnance(req.params.id);
      if (!ordonnance) {
        return res.status(404).json({ message: 'Ordonnance non trouvée' });
      }
      res.json({ message: 'Ordonnance supprimée avec succès' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = { ordonnanceOphtaController };
