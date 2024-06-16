const { Op } = require('sequelize');

const { Transaction, sequelize } = require('../database/models');
const { processRequest } = require('../helpers/core');

class TransactionService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(filter = {}, query) {
    const config = {
      where: filter,
      attributes: ['id', 'quantity', 'unitPrice', 'date'],
      include: [
        {
          association: 'product',
          attributes: ['name', 'id'],
        },
        { association: 'type' },
      ],
    };

    if (query && query.month && query.year) {
      const { month, year } = query;
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      config.where.date = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (query && query.page && query.limit) {
      return await processRequest(query, this.repository, config);
    }

    return await this.repository.findAll(config);
  }

  async getById(id) {
    return await this.repository.findByPk(id);
  }

  async getOne(filter) {
    return await this.repository.findOne({ where: filter });
  }

  async create(movement) {
    return await this.repository.create(movement);
  }

  async update(id, movement) {
    const record = await this.getById(id);
    if (!record) return null;
    return await record.update(movement);
  }

  async destroy(id) {
    const record = await this.getById(id);
    if (!record) return null;
    return await record.destroy();
  }

  async getTransactionsMonths(productId) {
    return await sequelize.query(
      `
      SELECT EXTRACT(MONTH FROM transaction.date) AS month
      FROM transaction
      WHERE product_id = ${productId} AND deleted_at is NULL
      GROUP BY month
    `,
      { type: sequelize.QueryTypes.SELECT },
    );
  }

  async getSalesAndRemainStocksByMonth(productId) {
    return await sequelize.query(
      `
      SELECT 
        EXTRACT(YEAR FROM transaction.date) AS year,
        CASE
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'ene.' THEN 'Enero'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'feb.' THEN 'Febrero'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'mar.' THEN 'Marzo'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'abr.' THEN 'Abril'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'may.' THEN 'Mayo'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'jun.' THEN 'Junio'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'jul.' THEN 'Julio'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'ago.' THEN 'Agosto'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'sep.' THEN 'Septiembre'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'oct.' THEN 'Octubre'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'nov.' THEN 'Noviembre'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'dic.' THEN 'Diciembre'
        END as month,
        SUM(CASE
                WHEN type.id = 2 THEN (transaction.quantity * -1)
                ELSE 0
            END
        ) AS sales_quantity
      FROM product
      LEFT JOIN transaction ON product.id = transaction.product_id
      LEFT JOIN transaction_type as type ON transaction.type_id = type.id
      WHERE product.id = ${productId}
      GROUP BY year, month;
    `,
      { type: sequelize.QueryTypes.SELECT },
    );
  }

  async getSalesHistoryByYear(year, productId) {
    return await sequelize.query(
      `
      SELECT 
        EXTRACT(YEAR FROM transaction.date) AS year,
        CASE
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'ene.' THEN 'Enero'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'feb.' THEN 'Febrero'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'mar.' THEN 'Marzo'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'abr.' THEN 'Abril'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'may.' THEN 'Mayo'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'jun.' THEN 'Junio'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'jul.' THEN 'Julio'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'ago.' THEN 'Agosto'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'sep.' THEN 'Septiembre'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'oct.' THEN 'Octubre'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'nov.' THEN 'Noviembre'
          WHEN TO_CHAR(transaction.date, 'TMmon') = 'dic.' THEN 'Diciembre'
        END as month,
        SUM(CASE
                WHEN type.id = 2 THEN (transaction.quantity * -1)
                ELSE 0
            END
        ) AS sales_quantity
      FROM product
      LEFT JOIN transaction ON product.id = transaction.product_id
      LEFT JOIN transaction_type as type ON transaction.type_id = type.id
      WHERE product.id = ${productId} AND EXTRACT(YEAR FROM transaction.date) = ${year}
      GROUP BY year, month;
    `,
      { type: sequelize.QueryTypes.SELECT },
    );
  }
}

module.exports = new TransactionService(Transaction);
