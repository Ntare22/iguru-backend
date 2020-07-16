import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import { unverifiedUser } from './mock/user.mock';
import { encode } from '../utils/jwt-processor';

chai.use(chaiHttp);

const prefix = '/api/v1/auth';
const token = encode(unverifiedUser);
describe('VERIFY ACCOUNT', () => {
  it('users should be able to show account has already been verified', (done) => {
    chai
      .request(app)
      .get(`${prefix}/verification?token=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
    done();
  });
});
