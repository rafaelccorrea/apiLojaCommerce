import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attribute.belongsTo(models.Variation, {
        foreignKey: 'variationId',
        as: 'variation',
      });
      Attribute.belongsToMany(models.Advertisement, {
        through: 'AdvertisementAttribute',
        foreignKey: 'attributeId',
        otherKey: 'advertisementId',
        as: 'advertisements',
      });
    }
  }
  Attribute.init(
    {
      name: DataTypes.STRING,
      value: DataTypes.STRING,
      type: DataTypes.ENUM('hexadecimal', 'text'),
      approved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Attribute',
    }
  );
  return Attribute;
};
