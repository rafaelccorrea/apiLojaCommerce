import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Setting.belongsTo(models.User, {
        foreignKey: 'updatedBy',
      });
    }
  }
  Setting.init(
    {
      multiPoints: DataTypes.DECIMAL(10, 2),
      pricePerPoint: DataTypes.DECIMAL(10, 2),
      fullBanners: DataTypes.ARRAY(DataTypes.STRING),
      miniBannerOne: DataTypes.STRING,
      miniBannerTwo: DataTypes.STRING,
      miniBannerThree: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Setting',
    }
  );
  return Setting;
};
