

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryLevelThree extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoryLevelThree.belongsTo(models.CategoryLevelTwo, {
        foreignKey: 'categoryLevelTwoId',
        as: 'category',
      });
      CategoryLevelThree.hasMany(models.CategoryLevelFour, {
        foreignKey: 'categoryLevelThreeId',
        as: 'categories',
      });
    }
  }
  CategoryLevelThree.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CategoryLevelThree',
    }
  );
  return CategoryLevelThree;
};
