const CashOperation = require('../database/models/cashOperation.model');

class CashOperationService {
  async create(data) {
    const cashOperation = new CashOperation(data);
    return await cashOperation.save();
  }

  async findById(id) {
    return await CashOperation.findById(id).populate('user').exec();
  }

  async findAll(filter = {}) {
    return await CashOperation.find(filter).populate('user').exec();
  }

  async updateById(id, data) {
    return await CashOperation.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteById(id) {
    return await CashOperation.findByIdAndDelete(id).exec();
  }
}

module.exports = new CashOperationService();
