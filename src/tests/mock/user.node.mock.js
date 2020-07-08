const mocks = require('node-mocks-http');

const response = mocks.createResponse();

const nodeUser = {
  response,
  request: {
    user: {
      lastName: 'email',
      email: 'testingemail@gmail.com',
      password: 'TC866XY9EHEGz!+P',
    },
  },
};

export default nodeUser;
