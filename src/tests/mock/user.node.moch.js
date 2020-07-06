const mocks = require('node-mocks-http');

const response = mocks.createResponse();

const node_user = {
  response,
  request: {
    user: {
      lastName: 'email',
      email: 'testingemail@gmail.com',
      password: 'TC866XY9EHEGz!+P',
    },
  },
};

export default node_user;
