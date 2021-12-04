'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transations', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      bank_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      agencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      agencia_dv: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      conta: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      conta_dv: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      type:{
        type: Sequelize.ENUM('conta_corrente', 'conta_poupanca', 'conta_corrente_conjunta', 'conta_poupanca_conjunta'),
        allowNull: false,
      },

      document_type: {
        type: Sequelize.ENUM('CPF', 'CNPJ'),
        allowNull: false,
      },

      document_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      legal_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      storeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Stores",
          key: "id",
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transations');
  }
};
