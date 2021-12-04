import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class HistoricStores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HistoricStores.belongsTo(models.User, {
        foreignKey: 'updatedBy',
      });
      HistoricStores.belongsTo(models.Store, {
        foreignKey: 'storeId',
        as: 'store',
      });
    }
  }
  HistoricStores.init(
    {
      quotation: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: 'HistoricStores',
    }
  );
  return HistoricStores;
};
