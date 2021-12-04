

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryLevelOne extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoryLevelOne.hasMany(models.CategoryLevelTwo, {
        foreignKey: 'categoryLevelOneId',
        as: 'categories',
      });
    }
  }
  CategoryLevelOne.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CategoryLevelOne',
    }
  );
  return CategoryLevelOne;
};
