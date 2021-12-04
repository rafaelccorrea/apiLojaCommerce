module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Admin',
          email: 'admin@ganhepontos.com',
          cpf: '11111111111',
          cellphone: '99999999999',
          password:
            '$2b$10$wubh81m1SU3DPQlsz3G16OhIxACdyFoTNgiNLYmFnaYrbIzR2bQtK',
          admin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'User',
          email: 'user@ganhepontos.com',
          cpf: '00000000000',
          cellpho$2b$10$XTwJqG732nx5eP0Um5zGdOQtB8ocRLOxiNf0kuhIff7gtWwPCHn2ine: '77777777777',
          password:
            '',
          admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
