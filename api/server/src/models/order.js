const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        as: "Usuario",
      });

      Order.belongsTo(models.Advertisement, {
        foreignKey: "id",
        as: "anuncio",
      });
    }
  }
  Order.init(
    {
      codeOrder: DataTypes.INTEGER,
      valueOrder: DataTypes.INTEGER,
      partialOrderValue: DataTypes.INTEGER,
      discountValue: DataTypes.INTEGER,
      discountCoupon: DataTypes.STRING,
      trackingCode: DataTypes.STRING,
      redemptionCoupon: DataTypes.STRING,
      hashCart: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Order;
};
