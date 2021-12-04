

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Store, {
        through: 'UserStore',
        foreignKey: 'userId',
        otherKey: 'storeId',
        as: 'stores',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      cpf: DataTypes.STRING,
      cellphone: DataTypes.STRING,
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      addressId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
