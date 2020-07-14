const mocks = require('node-mocks-http');

const response = mocks.createResponse();

export const nodeCompany = {
  response,
  request: {
    user: {
      name: 'radiant',
      description:
        'Radiant Insurance Ltd is the insurance company accredited by the National Bank of Rwanda to provide short-term insurance. Our primary objective is to bring you credible, innovative and robust short-term and long-term insurance products. We take the guesswork out of insurance, by working fast and successfully delivering fit-for-purpose market-leading insurance products and practices to clients across Rwanda.',
    },
  },
};

export const company = {
  name: 'radiant',
  description:
    'Radiant Insurance Ltd is the insurance company accredited by the National Bank of Rwanda to provide short-term insurance. Our primary objective is to bring you credible, innovative and robust short-term and long-term insurance products. We take the guesswork out of insurance, by working fast and successfully delivering fit-for-purpose market-leading insurance products and practices to clients across Rwanda.',
  imageUrl: 'http://radiant.co.rw/wp-content/uploads/2017/05/radiant.gif',
};

export const emptyCompany = {};
