const MontureModel = require("../database/models/monture.model"); // Assurez-vous que le modèle de la monture est correctement importé

class MontureService {
  // Créer une nouvelle monture
  async createMonture(data) {
    const monture = new MontureModel(data);
    return await monture.save();
  }

  // Récupérer toutes les montures
  async getAllMontures() {
    return await MontureModel.find();
  }

  // Récupérer une monture par ID
  async getMontureById(id) {
    return await MontureModel.findById(id);
  }

  // Mettre à jour une monture par ID
  async updateMonture(id, data) {
    return await MontureModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Supprimer une monture par ID
  async deleteMonture(id) {
    return await MontureModel.findByIdAndDelete(id);
  }


  // Toggler la propriété en_stock
async toggleStock(id) {
    const monture = await Monture.findById(id);
    if (!monture) {
      throw new Error('Monture non trouvée');
    }
    monture.isInStock = !monture.isInStock; // Inverser la disponibilité
    return await monture.save();
  }
  
}

module.exports = new MontureService();
