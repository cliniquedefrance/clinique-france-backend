const venteService = require('../../services/vente.service');

/**
 * Crée une nouvelle vente.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
async function creerVente(req, res) {
    try {
        const vente = await venteService.creerVente(req.body);
        res.status(201).json(vente);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la vente', error: error.message });
    }
}


/**
 * Récupère une vente par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
async function obtenirVenteParId(req, res) {
    try {
        const vente = await venteService.obtenirVenteParId(req.params.id);
        if (!vente) {
            return res.status(404).json({ message: 'Vente non trouvée' });
        }
        res.json(vente);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la vente', error: error.message });
    }
}

/**
 * Met à jour une vente.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
async function mettreAJourVente(req, res) {
    try {
        const vente = await venteService.mettreAJourVente(req.params.id, req.body);
        res.json(vente);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la vente', error: error.message });
    }
}

/**
 * Supprime une vente par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
async function supprimerVente(req, res) {
    try {
        await venteService.supprimerVente(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la vente', error: error.message });
    }
}

/**
 * Récupère toutes les ventes, avec un filtre optionnel par statut de paiement.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
async function obtenirToutesLesVentes(req, res) {
    try {
        const ventes = await venteService.obtenirToutesLesVentes(req.query.statutPaiement);
        res.json(ventes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des ventes', error: error.message });
    }
}

module.exports = {
    creerVente,
    obtenirVenteParId,
    mettreAJourVente,
    supprimerVente,
    obtenirToutesLesVentes
};
