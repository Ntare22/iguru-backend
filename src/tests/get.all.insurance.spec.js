import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { mockToken } from './mock/jwt.mock';

chai.use(chaiHttp);

const prefix = '/api/v1/company';

describe('COMPANY', () => {
  it('should get all insurance companies successfully', (done) => {
    chai
      .request(app)
      .get(`${prefix}/get-all`)
      .set('x-access-token', `${mockToken}`)
      .end((err, res) => {
        expect(res.body).to.have.keys('status', 'message', 'data');
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.be.equal(
          'All insurance companies retrieved successfully'
        );
        expect(res);
        done();
      });
  });
});
