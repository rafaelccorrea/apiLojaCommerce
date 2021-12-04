import { Model } from 'sequelize';

module.exports = ( sequelize, DataTypes ) => {

  class Transations extends Model {

    static associate(models) {
      Transations.belongsTo(models.Store, {
        foreignKey: 'storeId',
        as: 'store',
      });
    }

  }

  Transations.init(
    {
      bank_code: DataTypes.STRING,
      agencia: DataTypes.STRING,
      agencia_dv: DataTypes.STRING,
      conta: DataTypes.STRING,
      conta_dv: DataTypes.STRING,
      type: DataTypes.ENUM('conta_corrente', 'conta_poupanca', 'conta_corrente_conjunta','conta_poupanca_conjunta'),
      document_type: DataTypes.ENUM('CPF', 'CNPJ'),
      document_number: DataTypes.STRING,
      legal_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName:"Transations"
    }
  );
  return Transations;

}
