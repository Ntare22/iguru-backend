import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import vehicle from './mock/vehicle.mock';
import { mockToken } from './mock/jwt.mock';

chai.use(chaiHttp);

const prefix = '/api/v1/vehicles';

describe('ADD VEHICLE', () => {
  it('should add a new vehicle by a user', (done) => {
    chai
      .request(app)
      .post(`${prefix}/add`)
      .set('x-access-token', `${mockToken}`)
      .send(vehicle)
      .end((err, res) => {
        expect(res.body.status).to.be.equal(201);
        expect(res.body.message).to.be.equal('New vehicle was added successfully');
        expect(res);
        done();
      });
  });
});
