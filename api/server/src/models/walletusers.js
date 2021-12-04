import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class WalletUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WalletUsers.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  WalletUsers.init(
    {
      points: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: 'WalletUsers',
    }
  );
  return WalletUsers;
};
