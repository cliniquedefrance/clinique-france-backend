const mongoose = require('mongoose');
const { MONTURE } = require('../../constants/entity');

const MontureSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true, // Marque de la monture
  },
  model: {
    type: String,
    required: true, // Modèle de la monture
  },
  image: {
    url: {
      type: String, // URL de l'image de la monture (optionnel)
    },
    altText: {
      type: String, // Texte alternatif pour l'image (optionnel)
    },
  },

  isInStock: {
    type: Boolean,
    default: true, // Par défaut, la monture est considérée en stock
  }
  
}, { timestamps: true });

module.exports = mongoose.model(MONTURE, MontureSchema);
