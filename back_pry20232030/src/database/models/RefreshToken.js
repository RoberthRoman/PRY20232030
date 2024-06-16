const { Model } = require('sequelize');

module.exports = (sequelizeConnection, dataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  RefreshToken.init(
    {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: dataTypes.STRING,
        unique: true,
      },
      expiresAt: {
        field: 'expires_at',
        type: dataTypes.DATE,
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
      modelName: 'RefreshToken',
      tableName: 'refresh_token',
      createdAt: 'created_at',
      updatedAt: false,
    },
  );

  return RefreshToken;
};
