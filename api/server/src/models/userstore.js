

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserStore.belongsTo(models.User, { foreignKey: 'userId' });
      UserStore.belongsTo(models.Store, { foreignKey: 'storeId' });
    }
  }
  UserStore.init(
    {
      userId: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
      permissions: {
        type: DataTypes.ARRAY(
          DataTypes.ENUM({
            values: ['create', 'read', 'update', 'delete'],
          })
        ),
      },
    },
    {
      sequelize,
      modelName: 'UserStore',
    }
  );

  return UserStore;
};
