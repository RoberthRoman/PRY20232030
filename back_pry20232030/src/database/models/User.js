const { Model } = require('sequelize');
const { bcryptHelper } = require('../../helpers/libs');

const userHooks = {
  beforeCreate: async (instance, options) => {
    instance.password = await bcryptHelper.hash(instance.password);
  },
};

module.exports = (sequelizeConnection, dataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
        as: 'refreshTokens',
      });

      User.hasMany(models.Product, {
        foreignKey: 'userId',
        as: 'products',
      });

      User.hasMany(models.Transaction, {
        foreignKey: 'userId',
        as: 'transactions',
      });
    }
  }

  User.init(
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: dataTypes.STRING(150),
        unique: true,
      },
      password: {
        type: dataTypes.STRING(300),
      },
      firstName: {
        type: dataTypes.STRING(70),
        field: 'first_name',
      },
      lastName: {
        type: dataTypes.STRING(70),
        field: 'last_name',
      },
      recoverToken: {
        field: 'recover_token',
        type: dataTypes.STRING(300),
        defaultValue: null,
      },
    },
    {
      sequelize: sequelizeConnection,
      hooks: userHooks,
      modelName: 'User',
      tableName: 'user',
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return User;
};
