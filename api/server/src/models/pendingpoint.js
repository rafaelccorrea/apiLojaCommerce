'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class PendingPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PendingPoint.init(
    {
      receiver: DataTypes.STRING,
      points: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: 'PendingPoint',
    }
  );
  return PendingPoint;
};
