const { Model } = require('sequelize');

module.exports = (sequelizeConnection, dataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
      Transaction.belongsTo(models.TransactionType, {
        foreignKey: 'typeId',
        as: 'type',
      });
    }
  }

  Transaction.init(
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: dataTypes.INTEGER,
        field: 'product_id',
        references: {
          model: 'product',
          key: 'id',
        },
      },
      typeId: {
        type: dataTypes.INTEGER,
        field: 'type_id',
        references: {
          model: 'transaction_type',
          key: 'id',
        },
      },
      quantity: {
        type: dataTypes.INTEGER,
      },
      unitPrice: {
        type: dataTypes.DECIMAL(10, 2),
        field: 'unit_price',
      },
      userId: {
        field: 'user_id',
        type: dataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      date: {
        type: dataTypes.DATE,
      },
    },
    {
      sequelize: sequelizeConnection,
      modelName: 'Transaction',
      tableName: 'transaction',
      paranoid: true,
      createdAt: 'date',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Transaction;
};
