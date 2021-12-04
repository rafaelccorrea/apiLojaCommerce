import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class WalletStores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WalletStores.belongsTo(models.Store, {
        foreignKey: 'storeId',
        as: 'store',
      });
    }
  }
  WalletStores.init(
    {
      points: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: 'WalletStores',
    }
  );
  return WalletStores;
};
