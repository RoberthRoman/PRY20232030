'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(150),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(300),
      },
      first_name: {
        type: Sequelize.STRING(70),
      },
      last_name: {
        type: Sequelize.STRING(70),
      },
      recover_token: {
        type: Sequelize.STRING(300),
        defaultValue: null,
      },
      //activation_token: {
      //   type: Sequelize.STRING(300),
      //   defaultValue: null,
      // },
      // active: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false,
      // },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
    await queryInterface.dropTable('user', null, {});
  },
};
