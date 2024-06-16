const { TransactionType } = require('../database/models');

class TransactionTypeService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    return await this.repository.findByPk(id);
  }

  async create(type) {
    return await this.repository.create(type);
  }

  async update(id, movementType) {
    const record = await this.getById(id);
    if (!record) return null;
    return await record.update(movementType);
  }

  async delete(id) {
    const record = await this.getById(id);
    if (!record) return null;
    return await record.destroy();
  }

  async getByName(name) {
    return await this.repository.findOne({ where: { name } });
  }
}

module.exports = new TransactionTypeService(TransactionType);
