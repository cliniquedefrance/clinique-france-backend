const mongoose = require("mongoose");
const {
  PATIENT,
  CENTRE,
  RIGHT,
  CIVILITY,
  USER,
} = require("../../constants/entity");

const fichePatientModel = mongoose.Schema({
  civility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CIVILITY,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  surname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
  },
  telephone: {
    type: String,
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  initiales: {
    type: String,
  },
  photo: {
    type: String,
  },
  active: {
    type: Boolean,
    required: true,
  },
  expoToken: { type: String },
  rights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: RIGHT,
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: USER },
});
module.exports = mongoose.model(PATIENT, fichePatientModel);
