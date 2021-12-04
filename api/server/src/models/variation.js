import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Variation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Variation.hasMany(models.Attribute, {
        foreignKey: 'variationId',
        as: 'attributes',
      });
    }
  }
  Variation.init(
    {
      name: DataTypes.STRING,
      approved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Variation',
    }
  );
  return Variation;
};
