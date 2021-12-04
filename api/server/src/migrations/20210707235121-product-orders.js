module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductOrders", {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      OrderId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Orders',
          key: 'id'
        }
      },

      adverseId:{
        type: Sequelize.INTEGER
      },

      quantity:{
        type: Sequelize.INTEGER,
        default: 1
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
    await queryInterface.dropTable('ProductOrders')
  }
};
