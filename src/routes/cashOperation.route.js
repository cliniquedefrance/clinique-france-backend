const express = require('express');
const CashOperationController = require('../database/controllers/cashOperation.controller');

const router = express.Router();

router.post('/', CashOperationController.create); // Create a cash operation
router.get('/', CashOperationController.getAll); // Get all cash operations
router.get('/:id', CashOperationController.getById); // Get a single cash operation by ID
router.put('/:id', CashOperationController.update); // Update a cash operation by ID
router.delete('/:id', CashOperationController.delete); // Delete a cash operation by ID

module.exports = router;
