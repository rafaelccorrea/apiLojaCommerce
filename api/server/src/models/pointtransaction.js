import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class PointTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PointTransaction.belongsTo(models.Store, {
        foreignKey: 'storeId',
        as: 'store',
      });
    }
  }
  PointTransaction.init(
    {
      receiver: DataTypes.STRING,
      points: DataTypes.DECIMAL(10, 2),
      amount: DataTypes.DECIMAL(10, 2),
      quotation: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: 'PointTransaction',
    }
  );
  return PointTransaction;
};
