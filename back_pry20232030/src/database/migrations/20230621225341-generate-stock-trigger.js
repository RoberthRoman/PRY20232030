'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const createTriggerFunctionQuery = `
    CREATE OR REPLACE FUNCTION update_stock_trigger_function()
    RETURNS TRIGGER AS $$
    BEGIN
      UPDATE product
      SET stock = stock + NEW.quantity
      WHERE id = NEW.product_id;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;
    await queryInterface.sequelize.query(createTriggerFunctionQuery);

    const createTriggerQuery = `
    CREATE TRIGGER update_stock_trigger
    AFTER INSERT ON transaction
    FOR EACH ROW
    EXECUTE FUNCTION update_stock_trigger_function();
  `;
    await queryInterface.sequelize.query(createTriggerQuery);
  },

  async down(queryInterface, Sequelize) {
    const dropTriggerQuery = `
      DROP TRIGGER IF EXISTS update_stock_trigger ON transaction;
    `;
    await queryInterface.sequelize.query(dropTriggerQuery);

    const dropTriggerFunctionQuery = `
      DROP FUNCTION IF EXISTS update_stock_trigger_function();
    `;
    await queryInterface.sequelize.query(dropTriggerFunctionQuery);
  },
};
