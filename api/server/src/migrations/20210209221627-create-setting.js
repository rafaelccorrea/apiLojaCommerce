module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      multiPoints: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      pricePerPoint: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      fullBanners: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      miniBannerOne: {
        type: Sequelize.TEXT,
      },
      miniBannerTwo: {
        type: Sequelize.TEXT,
      },
      miniBannerThree: {
        type: Sequelize.TEXT,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Settings');
  },
};
