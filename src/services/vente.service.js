const cashOperationModel = require("../database/models/cashOperation.model");
const MontureModel = require("../database/models/monture.model");
const { VenteOphtaModel } = require("../database/models/vente.model");

/**
 * Crée une nouvelle vente.
 * @param {Object} venteData - Les informations de la vente.
 * @returns {Promise<Object>} La vente créée.
 */
async function creerVente(venteData) {
 
  const { client, clientNonEnregistre, articles, ordonnance, montantTotal, montantPaye, reductions, ordonnancePrixOD, ordonnancePrixOG, user } = venteData;

  // Vérification des quantités disponibles pour chaque monture
  for (let article of articles) {
      const monture = await MontureModel.findById(article.monture);
      if (!monture) {
          throw new Error(`Monture non trouvée pour l'ID: ${article.monture}`);
      }
      if (monture.quantity < article.quantite) {
          throw new Error(`Quantité insuffisante pour la monture: ${monture.brand} ${monture.model}`);
      }
  }

  // Décrémente les quantités de montures une fois les vérifications passées
  for (let article of articles) {
      await MontureModel.findByIdAndUpdate(
          article.monture,
          { $inc: { quantity: -article.quantite } },
          { new: true }
      );
  }

  // Création de la vente
  const vente = new VenteOphtaModel({
      client,
      clientNonEnregistre,
      articles,
      ordonnance,
      montantTotal,
      montantPaye,
      reductions,
      ordonnancePrixOD,
      ordonnancePrixOG,
      resteAPayer: montantTotal - montantPaye,
      statutPaiement: montantPaye >= montantTotal ? 'payé' : montantPaye > 0 ? 'partiel' : 'impayé',
      user,
  });

  const venteResult = await vente.save();


  // Création de l'opération de caisse associée
  const operationDescription = `
      Vente réalisée${client ? ` pour le client ${client.nom}` : clientNonEnregistre ? ` pour un client non enregistré (${clientNonEnregistre.nom})` : ''}.
      Montant total : ${montantTotal} .
      Montant payé : ${montantPaye} .
      Reste à payer : ${montantTotal - montantPaye} .
  `.trim();

  const operation = new cashOperationModel({
      type: "income",
      description: operationDescription,
      amount: montantPaye,
      vente: venteResult._id, // Associer l'opération à cette vente
      date: new Date(),
      user
  });

  await operation.save();

  return venteResult;
}

/**
 * Récupère une vente par son ID.
 * @param {String} venteId - L'ID de la vente.
 * @returns {Promise<Object>} La vente trouvée.
 */
async function obtenirVenteParId(venteId) {
    return await VenteOphtaModel.findById(venteId)
        .populate('client')
        .populate('articles.monture')
        .populate('ordonnance')
        .populate("user")
        .exec();
}

/**
 * Met à jour les informations d'une vente existante.
 * @param {String} venteId - L'ID de la vente à mettre à jour.
 * @param {Object} updateData - Les nouvelles données de la vente.
 * @returns {Promise<Object>} La vente mise à jour.
 */
async function mettreAJourVente(venteId, updateData) {
  const vente = await VenteOphtaModel.findById(venteId);
  if (!vente) throw new Error('Vente non trouvée');

  // Calcul de la différence de montant
  const montantAncien = vente.montantPaye;
  const montantNouveau = updateData.montantPaye || montantAncien;
  const difference = montantNouveau - montantAncien;

  // Met à jour les données de la vente
  vente.montantPaye = montantNouveau;
  vente.resteAPayer = vente.montantTotal - vente.montantPaye;
  vente.statutPaiement = montantNouveau >= vente.montantTotal
      ? 'payé'
      : montantNouveau > 0 ? 'partiel' : 'impayé';

  vente.articles = updateData.articles || vente.articles;
  vente.reductions = updateData.reductions || vente.reductions;

  // Sauvegarde de la vente mise à jour
  const venteMiseAJour = await vente.save();

  // Création d'une opération de caisse si le montant a changé
  if (difference !== 0) {
      const operationType = difference > 0 ? 'income' : 'expense';
      const operationMessage = difference > 0
          ? `Augmentation du paiement pour la vente ID ${venteId}. Montant ajouté : ${difference.toFixed(2)}.`
          : `Réduction du paiement pour la vente ID ${venteId}. Montant retiré : ${Math.abs(difference).toFixed(2)}.`;

      const operation = new cashOperationModel({
          type: operationType,
          amount: Math.abs(difference),
          description: operationMessage,
          user: updateData.user || vente.user, // Utilisateur responsable de la modification
          vente: vente._id, // Association avec la vente mise à jour
          date: new Date(),
      });

      await operation.save();
  }

  return venteMiseAJour;
}

/**
 * Supprime une vente par son ID.
 * @param {String} venteId - L'ID de la vente à supprimer.
 * @returns {Promise<Object>} La vente supprimée.
 */
async function supprimerVente(venteId) {
    return await VenteOphtaModel.findByIdAndDelete(venteId);
}

/**
 * Récupère toutes les ventes, avec possibilité de filtrer par statut de paiement.
 * @param {String} [statutPaiement] - Optionnel, filtre sur le statut de paiement.
 * @returns {Promise<Array<Object>>} Les ventes trouvées.
 */
async function obtenirToutesLesVentes(statutPaiement) {
    const filtre = statutPaiement ? { statutPaiement } : {};
    return await VenteOphtaModel.find(filtre)
        .populate('client')
        .populate('articles.monture')
        .populate('ordonnance')
        .exec();
}

module.exports = {
    creerVente,
    obtenirVenteParId,
    mettreAJourVente,
    supprimerVente,
    obtenirToutesLesVentes
};
