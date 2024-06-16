'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaction_type', [
      {
        name: 'Entrada',
      },
      {
        name: 'Salida',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transaction_type', null, {});
  },
};
