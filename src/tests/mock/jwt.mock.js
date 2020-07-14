import { encode } from '../../utils/jwt-processor';

export const claims = {
  data: {
    email: 'blaise@gmail.com',
    userId: 'd0a051d9-447a-49a8-aebc-7e1b031afd62',
  },
};
export const unRegisteredClaims = {
  data: {
    email: 'iamnotregistered@gmail.com',
    userId: 'e80a1b34-128d-98ea-9434-ab01a1e03ed1',
  },
};

export const falseUserClaims = {
  data: {
    email: 'iguru@gmail.com',
    userId: 'd0a051d9-447a-49a8-aebc-7e1b039afd64',
  },
};

export const mockToken = encode(claims);
export const unRegisteredToken = encode(unRegisteredClaims);
export const falseToken = encode(falseUserClaims);
