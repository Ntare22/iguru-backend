import chai from 'chai';
import { claims, mockToken } from './mock/jwt.mock';
import { encode, decode } from '../utils/jwt-processor';

describe('JSON web token', () => {
  it('should return JSON web token', () => {
    const token = encode(claims);
    chai.expect(token).equal(token);
  });
  it('should return object including claims', () => {
    const payload = decode(mockToken);
    chai.expect(payload).equal(payload);
  });
});