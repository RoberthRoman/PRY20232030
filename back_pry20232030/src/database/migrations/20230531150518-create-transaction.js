'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaction', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
          key: 'id',
        },
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'transaction_type',
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      date: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaction', null, {});
  },
};
