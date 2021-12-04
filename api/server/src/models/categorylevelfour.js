

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryLevelFour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoryLevelFour.belongsTo(models.CategoryLevelThree, {
        foreignKey: 'categoryLevelThreeId',
        as: 'category',
      });
      CategoryLevelFour.hasMany(models.Product, {
        foreignKey: 'categoryLevelFourId',
        as: 'products',
      });
    }
  }
  CategoryLevelFour.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategoryLevelFour',
  });
  return CategoryLevelFour;
};
