const mongoose = require('mongoose');
const { ORDONANCE_OPHTAMOLOGY, PATIENT, MONTURE,USER } = require('../../constants/entity');
const Schema = mongoose.Schema;

const VenteOphtaSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: PATIENT, // Si le client est enregistré en tant que patient
    required: false
  },
  clientNonEnregistre: {
    nom: { type: String, required: function() { return !this.client; }},
    contact: { type: String }
  },
  articles: [
    {
      monture: { type: Schema.Types.ObjectId, ref: MONTURE },
      quantite: { type: Number, required: true },
      prixUnitaire: { type: Number, required: true },
      remise: { type: Number, default: 0 } // Montant ou pourcentage de remise
    }
  ],
  ordonnance: {
    type: Schema.Types.ObjectId,
    ref: ORDONANCE_OPHTAMOLOGY, // L'ordonnance pour les verres correcteurs, si nécessaire
    required: function() { return !!this.client; }
  },
  ordonnancePrixOD: { type: Number, required: false },
  ordonnancePrixOG: {type: Number, required: false },
  montantTotal: { type: Number, required: true },
  montantPaye: { type: Number, default: 0 },
  resteAPayer: {
    type: Number,
    default: function() {
      return this.montantTotal - this.montantPaye;
    }
  },
  dateVente: { type: Date, default: Date.now },
  statutPaiement: {
    type: String,
    enum: ['payé', 'partiel', 'impayé'],
    default: function() {
      return this.montantPaye >= this.montantTotal ? 'payé' : this.montantPaye > 0 ? 'partiel' : 'impayé';
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
    required: true,
  },
  reductions: [
    {
      description: String,
      montant: Number
    }
  ]
}, { timestamps: true });

const VenteOphtaModel = mongoose.model('Vente', VenteOphtaSchema);
module.exports = {
    VenteOphtaModel
}
