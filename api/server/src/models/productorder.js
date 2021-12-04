import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class ProductOrders extends Model {

    static associate(models) {

      ProductOrders.belongsTo(models.Orders, {
        foreignKey: 'OrderId'
      })

    }

  }
  ProductOrders.init(
    {
      adverseId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProductOrders',
      freezeTableName: true,
      tableName: 'ProductOrders'
    }
  );
  return ProductOrders;
};
