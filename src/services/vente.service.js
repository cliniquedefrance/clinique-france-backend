const MontureModel = require("../database/models/monture.model");
const { VenteOphtaModel } = require("../database/models/vente.model");

/**
 * Crée une nouvelle vente.
 * @param {Object} venteData - Les informations de la vente.
 * @returns {Promise<Object>} La vente créée.
 */
async function creerVente(venteData) {
    const { client, clientNonEnregistre, articles, ordonnance, montantTotal, montantPaye, reductions, ordonnancePrixOD,ordonnancePrixOG } = venteData;
  
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
      statutPaiement: montantPaye >= montantTotal ? 'payé' : montantPaye > 0 ? 'partiel' : 'impayé'
    });
  
    return await vente.save();
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

    vente.montantPaye = updateData.montantPaye || vente.montantPaye;
    vente.resteAPayer = vente.montantTotal - vente.montantPaye;
    vente.statutPaiement = vente.montantPaye >= vente.montantTotal
        ? 'payé'
        : vente.montantPaye > 0 ? 'partiel' : 'impayé';

    vente.articles = updateData.articles || vente.articles;
    vente.reductions = updateData.reductions || vente.reductions;

    return await vente.save();
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
