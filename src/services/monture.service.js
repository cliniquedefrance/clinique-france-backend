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
    const monture = await MontureModel.findById(id);
    if (!monture) {
      throw new Error('Monture non trouvée');
    }
    monture.isInStock = !monture.isInStock; // Inverser la disponibilité
    return await monture.save();
  }



// Mise à jour de la quantité d'une monture
async  updateQuantity(montureId, newQuantity) {
  if (newQuantity < 0) {
    throw new Error('Quantity cannot be negative');
  }

  const monture = await MontureModel.findById(montureId);

  if (!monture) {
    throw new Error('Monture not found');
  }

  monture.quantity = newQuantity;
  await monture.save();

  return monture;
}

// Diminuer la quantité (lors d'une vente par exemple)
async decreaseQuantity(montureId, amount) {
  const monture = await MontureModel.findById(montureId);

  if (!monture) {
    throw new Error('Monture not found');
  }

  if (monture.quantity - amount < 0) {
    throw new Error('Not enough stock available');
  }

  monture.quantity -= amount;
  await monture.save();

  return monture;
}

// Augmenter la quantité (lors de la réception d'un nouvel arrivage par exemple)
async increaseQuantity(montureId, amount) {
  const monture = await MontureModel.findById(montureId);

  if (!monture) {
    throw new Error('Monture not found');
  }

  monture.quantity += amount;
  await monture.save();

  return monture;
}

  
}

module.exports = new MontureService();
