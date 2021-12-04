const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsToMany(models.User, {
        through: 'Users',
        foreignKey: 'addressId',
        as: 'address',
      });
    }
  }

  Address.init(
    {
      titleAddress: DataTypes.STRING,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      street: DataTypes.STRING,
      street_number: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Address',
      freezeTableName: true,
      tableName: 'Address'

    }
  )

  return Address;
};
