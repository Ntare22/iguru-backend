export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Users', [
      {
        id: 'd0a051d9-447a-49a8-aebc-7e1b031afd62',
        names: 'Blaise Izabayo',
        verified: true,
        email: 'blaise@gmail.com',
        password: '$2a$10$JUCGXOZMZUDUHXqRpbdoVuQ.0RuEEV26NKwnZUQJ2K1tE4FwW.nE.',
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
