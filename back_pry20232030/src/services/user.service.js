const { User } = require('../database/models');
const { processRequest } = require('../helpers/core');

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  create(user) {
    return this.repository.create(user);
  }

  destroy(id) {
    return this.repository.destroy(id);
  }

  getOne(filter) {
    return this.repository.findOne({ where: filter });
  }

  async getAll(filter = {}, query) {
    if (query && query.page && query.limit) {
      return await processRequest(query, this.repository, { where: filter });
    }
    return this.repository.findAll({ where: filter });
  }

  update(id, user) {
    return this.repository.update(user, { where: { id } });
  }
}

module.exports = new UserService(User);
