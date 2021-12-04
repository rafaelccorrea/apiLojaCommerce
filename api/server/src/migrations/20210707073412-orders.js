module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      codeOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      valueOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      partialOrderValue: {
        type: Sequelize.INTEGER,
      },
      discountValue: {
        type: Sequelize.INTEGER,
      },
      discountCoupon: {
        type: Sequelize.STRING,
      },
      trackingCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      redemptionCoupon: {
        type: Sequelize.STRING,
      },
      hashCart: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("Orders");
  },
};
