const { Model } = require('sequelize');

module.exports = (sequelizeConnection, dataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Transaction, {
        foreignKey: 'productId',
        as: 'transactions',
      });
    }
  }

  Product.init(
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: dataTypes.STRING(100),
      },
      stock: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
      },
      userId: {
        field: 'user_id',
        type: dataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize: sequelizeConnection,
      modelName: 'Product',
      tableName: 'product',
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Product;
};
