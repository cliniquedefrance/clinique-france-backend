const { OrdonnanceOphtaModel } = require('../database/models/ordonance.model');

const ordonnanceOphtaService = {
  // Créer une nouvelle ordonnance pour un patient
  async createOrdonnance(data) {
    try {
      const ordonnance = new OrdonnanceOphtaModel(data);
      return await ordonnance.save();
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'ordonnance : ${error.message}`);
    }
  },

  // Récupérer une ordonnance par son ID
  async getOrdonnanceById(id) {
    try {
      return await OrdonnanceOphtaModel.findById(id).populate('patient');
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'ordonnance : ${error.message}`);
    }
  },

  // Récupérer toutes les ordonnances d'un patient spécifique
  async getOrdonnancesByPatient(patientId) {
    try {
      return await OrdonnanceOphtaModel.find({ patient: patientId }).populate('patient');
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des ordonnances du patient : ${error.message}`);
    }
  },

  // Récupérer toutes les ordonnances globalement
  async getAllOrdonnances() {
    try {
      return await OrdonnanceOphtaModel.find().populate('patient');
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des ordonnances : ${error.message}`);
    }
  },

  // Mettre à jour une ordonnance par son ID
  async updateOrdonnance(id, data) {
    try {
      return await OrdonnanceOphtaModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'ordonnance : ${error.message}`);
    }
  },

  // Supprimer une ordonnance par son ID
  async deleteOrdonnance(id) {
    try {
      return await OrdonnanceOphtaModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'ordonnance : ${error.message}`);
    }
  }
};

module.exports = { ordonnanceOphtaService };
