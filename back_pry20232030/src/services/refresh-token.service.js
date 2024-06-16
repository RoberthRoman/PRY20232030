const { RefreshToken } = require('../database/models');

class TokenService {
  constructor(repository) {
    this.repository = repository;
  }

  create(token) {
    return this.repository.create({ token });
  }

  async validate(token) {
    return Boolean(await this.repository.findOne({ where: { token } }));
  }

  consume(token) {
    return this.repository.destroy({ where: { token }, force: true });
  }
}

module.exports = new TokenService(RefreshToken);
