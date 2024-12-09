const mongoose = require("mongoose")
const {  PATIENT, ORDONANCE_OPHTAMOLOGY } = require("../../constants/entity")
const Schema = mongoose.Schema;


// Définir le modèle Ordonnance
const ordonnanceOphtaSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: PATIENT, required: true },
  date: { type: Date, required: true },
  medecin : {
    type: String,
    require: false,
    default: 'non précisé'
  },
  oeilDroit: {
    SPH: { type: String },
    CYL: { type: String },
    AXE: { type: String },
    ADD: { type: String },
    EP: { type: String }
  },

  oeilGauche: {
    SPH: { type: String },
    CYL: { type: String },
    AXE: { type: String },
    ADD: { type: String },
    EP: { type: String }
  },

  traitements: [{ type: String }], // Par exemple : ["Photochromique", "Anti Reflet"]
  verre: { type: String }, // Ex. "Double Foyer", "Simple Vision"
  matiere: { type: String }, // Ex. "Organique", "Polycarbonate"
  port: { type: String }, // Ex. "Constant", "Inconstant"
  label: { type: String, default: "Ophtalmologie" },
}, {
    timestamps:true,
});

const OrdonnanceOphtaModel = mongoose.model(ORDONANCE_OPHTAMOLOGY, ordonnanceOphtaSchema);

module.exports = { OrdonnanceOphtaModel };
