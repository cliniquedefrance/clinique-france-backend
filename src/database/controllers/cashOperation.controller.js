const CashOperationService = require('../../services/cashOperation.service');

class CashOperationController {
  async create(req, res) {
    try {
      const data = req.body;
      const cashOperation = await CashOperationService.create(data);
      res.status(201).json(cashOperation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const cashOperation = await CashOperationService.findById(id);
      if (!cashOperation) {
        return res.status(404).json({ message: 'Cash operation not found' });
      }
      res.json(cashOperation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const filter = req.query || {};
      const cashOperations = await CashOperationService.findAll(filter);
      res.json(cashOperations);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedOperation = await CashOperationService.updateById(id, data);
      if (!updatedOperation) {
        return res.status(404).json({ message: 'Cash operation not found' });
      }
      res.json(updatedOperation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedOperation = await CashOperationService.deleteById(id);
      if (!deletedOperation) {
        return res.status(404).json({ message: 'Cash operation not found' });
      }
      res.json({ message: 'Cash operation deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CashOperationController();
