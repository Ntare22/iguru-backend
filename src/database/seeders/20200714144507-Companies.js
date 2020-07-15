export default {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Companies', [
      {
        id: 'd0a051d9-447a-49a8-aebc-7e1b031afd62',
        name: 'radiant',
        description:
          'Radiant Insurance Ltd is the insurance company accredited by the National Bank of Rwanda to provide short-term insurance. Our primary objective is to bring you credible, innovative and robust short-term and long-term insurance products. We take the guesswork out of insurance, by working fast and successfully delivering fit-for-purpose market-leading insurance products and practices to clients across Rwanda.',
        imageUrl: 'http://radiant.co.rw/wp-content/uploads/2017/05/radiant.gif',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd0a051d9-447a-49a8-aebc-7e1b031afd98',
        name: 'radiant',
        description:
          'Radiant Insurance Ltd is the insurance company accredited by the National Bank of Rwanda to provide short-term insurance. Our primary objective is to bring you credible, innovative and robust short-term and long-term insurance products. We take the guesswork out of insurance, by working fast and successfully delivering fit-for-purpose market-leading insurance products and practices to clients across Rwanda.',
        imageUrl: 'http://radiant.co.rw/wp-content/uploads/2017/05/radiant.gif',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Companies', null, {}),
};
