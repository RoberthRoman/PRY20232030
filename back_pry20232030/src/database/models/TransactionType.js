const { Model } = require('sequelize');

module.exports = (sequelizeConnection, dataTypes) => {
  class TransactionType extends Model {
    static associate(models) {
      TransactionType.hasMany(models.Transaction, {
        foreignKey: 'typeId',
        as: 'transactions',
      });
    }
  }

  TransactionType.init(
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: dataTypes.STRING(100),
      },
    },
    {
      sequelize: sequelizeConnection,
      modelName: 'TransactionType',
      tableName: 'transaction_type',
      timestamps: false,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );

  return TransactionType;
};
