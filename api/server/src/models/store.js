

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store.belongsToMany(models.User, {
        through: 'UserStore',
        foreignKey: 'storeId',
        otherKey: 'userId',
        as: 'users',
      });
      Store.hasMany(models.Advertisement, {
        foreignKey: 'storeId',
        as: 'adverts',
      });

      Store.hasMany(models.Product, {
        foreignKey: 'id',
        as: 'products',
      })

    }
  }
  Store.init(
    {
      name: DataTypes.STRING,
      social_reason: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      state_registration: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      approved: DataTypes.BOOLEAN,
      modality: DataTypes.ENUM('prepaid', 'post-paid'),
      recipient_id: DataTypes.STRING,
      type_sale: {
        type: DataTypes.ARRAY(
          DataTypes.ENUM({
            values: ['physic', 'virtual'],
          })
        ),
      },
    },
    {
      sequelize,
      modelName: 'Store',
    }
  );

  return Store;
};
