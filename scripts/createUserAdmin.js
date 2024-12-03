const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../src/database/models/user.model"); // Chemin vers votre modèle utilisateur
require("dotenv").config(); // Si vous utilisez un fichier .env pour vos variables d'environnement

const createAdmin = async () => {
  try {
    // Connexion à la base de données
    await mongoose.connect("mongodb+srv://cliniquedefrance841:HBI4CpA7iY38ApsB@cluster0.umdbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database.");

    // Vérifiez si un administrateur existe déjà
    const existingAdmin = await User.findOne({ email: "admin@user.com" });
    if (existingAdmin) {
      console.log("Admin user already exists. Aborting creation.");
      return;
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash("Clinique237@", 10);

    // Création de l'utilisateur admin
    const admin = new User({
      name: "Admin",
      surname: "User",
      email: "admin@user.com",
      password: hashedPassword,
      active: true,
      groups: null, // Ajustez si nécessaire
      isPraticien: false,
    });

    // Enregistrement dans la base de données
    await admin.save();
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error while creating admin user:", error.message);
  } finally {
    // Déconnexion de la base de données
    await mongoose.disconnect();
    console.log("Disconnected from the database.");
  }
};

createAdmin();
