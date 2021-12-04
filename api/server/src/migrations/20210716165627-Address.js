module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Address', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      titleAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      country: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      neighborhood:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      street_number:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      zipcode:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Users",
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
    await queryInterface.dropTable('Address')
  }
};
