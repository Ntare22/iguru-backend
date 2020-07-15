export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Users', [
      {
        id: 'd0a051d9-447a-49a8-aebc-7e1b031afd62',
        firstName: 'Blaise',
        lastName: 'Izabayo',
        verified: true,
        email: 'blaise@gmail.com',
        password: '$2a$10$JUCGXOZMZUDUHXqRpbdoVuQ.0RuEEV26NKwnZUQJ2K1tE4FwW.nE.',
        role: 'super_admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd0a051d9-447a-49a8-aebc-7e1b039afd64',
        firstName: 'iguru',
        lastName: 'customer',
        verified: false,
        email: 'iguru@gmail.com',
        password: '$2a$10$JUCGXOZMZUDUHXqRpbdoVuQ.0RuEEV26NKwnZUQJ2K1tE4FwW.nE.',
        role: 'insurance_buyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd0a051d9-447a-49a8-aebc-7e1b039afd26',
        firstName: 'iguru',
        lastName: 'customer',
        verified: true,
        email: 'buyer@gmail.com',
        password: '$2a$10$JUCGXOZMZUDUHXqRpbdoVuQ.0RuEEV26NKwnZUQJ2K1tE4FwW.nE.',
        role: 'insurance_buyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
