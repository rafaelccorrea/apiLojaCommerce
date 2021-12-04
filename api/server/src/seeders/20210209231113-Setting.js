module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Settings',
      [
        {
          multiPoints: 1.0,
          pricePerPoint: 1.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Settings', null, {});
  },
};
