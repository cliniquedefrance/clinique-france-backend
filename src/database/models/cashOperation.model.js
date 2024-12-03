const mongoose = require('mongoose');
const { CASH_OPERATION, USER, VENTE } = require('../../constants/entity');

const CashOperationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'], // entrée -> income, sortie -> expense
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
    required: true
  },
  vente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: VENTE, // Référence au modèle des ventes
    required: false // Optionnel
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(CASH_OPERATION, CashOperationSchema);
