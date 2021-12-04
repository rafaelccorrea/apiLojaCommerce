const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.CategoryLevelFour, {
        foreignKey: 'categoryLevelFourId',
        as: 'category',
      });

      Product.belongsTo(models.Store, {
        foreignKey: 'storeId',
        as: 'stores'
      })

    }
  }
  Product.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    type: DataTypes.ENUM('physic', 'virtual'),
    technicalSpecifications: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    approved: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
