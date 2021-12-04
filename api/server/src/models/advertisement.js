

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Advertisement.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
      Advertisement.belongsTo(models.Store, {
        foreignKey: 'storeId',
        as: 'store',
      });
    }
  }
  Advertisement.init(
    {
      price: DataTypes.INTEGER,
      promotionalPrice:  DataTypes.INTEGER,
      initialDatePromotion: DataTypes.DATE,
      finalDatePromotion: DataTypes.DATE,
      type: DataTypes.ENUM('product', 'service'),
      active: DataTypes.BOOLEAN,
      approved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Advertisement',
    }
  );
  return Advertisement;
};
