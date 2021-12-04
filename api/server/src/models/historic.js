const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Historic extends Model {

    static associate(models) {

      Historic.belongsTo(models.User, {
        foreignKey: 'userId',
        as : 'Usuario'
      })

      Historic.belongsTo(models.ProductOrders, {
        foreignKey: 'OrderId',
        as: 'Pedidos'
      })

    }

  }

  Historic.init({

  productId: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
  name: DataTypes.STRING,
  orderId: DataTypes.INTEGER,
  tangible: DataTypes.BOOLEAN

 },

 {
  sequelize,
  modelName: 'HistoricOrder',
  freezeTableName: true,
  tableName: 'HistoricOrder'

  }
)

  return Historic;
}
