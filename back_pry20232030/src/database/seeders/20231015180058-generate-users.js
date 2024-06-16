'use strict';

const { bcryptHelper } = require('../../helpers/libs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        email: 'johndoe@email.com',
        first_name: 'John',
        last_name: 'Doe',
        password: await bcryptHelper.hash('securepassword'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
