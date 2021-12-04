

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryLevelTwo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoryLevelTwo.belongsTo(models.CategoryLevelOne, {
        foreignKey: 'categoryLevelOneId',
        as: 'category',
      });
      CategoryLevelTwo.hasMany(models.CategoryLevelThree, {
        foreignKey: 'categoryLevelTwoId',
        as: 'categories',
      });
    }
  }
  CategoryLevelTwo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CategoryLevelTwo',
    }
  );
  return CategoryLevelTwo;
};
