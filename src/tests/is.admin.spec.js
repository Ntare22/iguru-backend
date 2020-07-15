import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { buyerUserClaimsToken } from './mock/jwt.mock';

chai.use(chaiHttp);

const prefix = '/api/v1/company';
const id = 'd0a051d9-447a-49a8-aebc-7e1b031afd62';

describe('DEACTIVATE COMPANY', () => {
  it('should not allow user with who is not super admin to deactivate a company', (done) => {
    chai
      .request(app)
      .patch(`${prefix}/deactivate?id=${id}`)
      .set('x-access-token', `${buyerUserClaimsToken}`)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error', 'Only super admins have access');
        expect(res.body).to.have.property('status', 403);
        expect(res);
        done();
      });
  });
});
