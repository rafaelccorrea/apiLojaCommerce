import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class AdvertisementAttribute extends Model {
    static associate(models) {
      AdvertisementAttribute.belongsTo(models.Advertisement, {
        foreignKey: 'advertisementId',
      });
      AdvertisementAttribute.belongsTo(models.Attribute, {
        foreignKey: 'attributeId',
      });
    }
  }
  AdvertisementAttribute.init(
    {
      images: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: 'AdvertisementAttribute',
    }
  );
  return AdvertisementAttribute;
};
