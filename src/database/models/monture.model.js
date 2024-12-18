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

  quantity: {
    type: Number,
    required: true,
    default: 1,  // Quantité par défaut à 1 s'il n'est pas spécifié
    min: 0       // La quantité ne peut pas être inférieure à 0
  },
  genre:{
    type: String,
    enum: ["Homme", "Femme"],
    required: false,
    default:  "Homme",
  },
  alert:{
    type: Number,
    required: false,
    default: 5,
  }

  
}, { timestamps: true });


// Définition de la propriété virtuelle "isInStock"
MontureSchema.virtual('isInStock').get(function() {
  return this.quantity > 0;
});

MontureSchema.virtual('isInAlert').get(function() {
  return this.quantity < this.alert;
});

// Permet d'inclure les propriétés virtuelles lors de la conversion du document en objet ou en JSON
MontureSchema.set('toObject', { virtuals: true });
MontureSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model(MONTURE, MontureSchema);
