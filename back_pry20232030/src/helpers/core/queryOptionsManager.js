const { Op } = require('sequelize');

const buildPaginationQuery = (offset, recordsPerPage) => ({
  offset,
  limit: recordsPerPage,
});
const buildInfoProperty = (pageNumber, totalPages, recordsPerPage) => {
  const isNextPageAvailable = totalPages !== pageNumber;
  const isPreviousPageAvailable = pageNumber !== 1;
  const nextPageQuery = `?page=${pageNumber + 1}&limit=${recordsPerPage}`;
  const prevPageQuery = `?page=${pageNumber - 1}&limit=${recordsPerPage}`;

  return {
    pageNumber,
    totalPages,
    recordsPerPage,
    nextPageQuery: isNextPageAvailable ? nextPageQuery : null,
    prevPageQuery: isPreviousPageAvailable ? prevPageQuery : null,
  };
};

class QueryOptionsManager {
  constructor(query, model) {
    this.query = query;

    this.model = model;
  }

  filter() {
    const queryCopy = { ...this.query };
    const removeFields = ['page', 'limit', 'sort', 'fields', 'offset'];

    removeFields.forEach(field => delete queryCopy[field]);
    if (Object.keys(queryCopy).length === 0) return this;

    const { month, year } = queryCopy;
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      this.where = {
        ...this.where,
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      };
    }
  }

  async paginate() {
    const { page, limit } = this.query;

    const pageNumber = parseInt(page, 10) || 1;
    const recordsPerPage = parseInt(limit, 10) || 10;
    const offset = (pageNumber - 1) * recordsPerPage;
    const totalRecords = await this.model.count();
    const totalPages = Math.ceil(totalRecords / recordsPerPage) || 1;

    this.query = buildPaginationQuery(offset, recordsPerPage);
    this.info = buildInfoProperty(pageNumber, totalPages, recordsPerPage);

    return this;
  }

  async execute(config = {}) {
    const results = await this.model.findAll({
      ...this.query,
      ...config,
      where: {
        ...this.where,
        ...config.where,
      },
    });
    return results;
  }
}

const processRequest = async (query, model, config) => {
  const queryOptionsManager = new QueryOptionsManager(query, model);
  queryOptionsManager.filter();
  await queryOptionsManager.paginate();
  const results = await queryOptionsManager.execute(config);

  return {
    info: queryOptionsManager.info,
    results,
  };
};

module.exports = { QueryOptionsManager, processRequest };
