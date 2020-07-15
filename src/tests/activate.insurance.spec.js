import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { user, errorUser } from './mock/user.mock';
import companiesController from '../controllers/companiesController';
import { company, emptyCompany, nodeCompany } from './mock/insurance.company.mock';
import { mockToken, falseToken } from './mock/jwt.mock';

chai.use(chaiHttp);

const prefix = '/api/v1/company';
const id = 'd0a051d9-447a-49a8-aebc-7e1b031afd62';
const wrongId = '46e9bfdf-6d21-4fd8-8fc7-df654d615be1';

describe('ACTIVATE COMPANY', () => {
  it('should not allow activating company without login', (done) => {
    chai
      .request(app)
      .patch(`${prefix}/activate?id=${id}`)
      .end((err, res) => {
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.status).to.be.equal(403);
        expect(res.body.error).to.be.equal('Please log in or sign up to continue');
        expect(res);
        done();
      });
  });

  it('should not allow user with verify false without providing data', (done) => {
    chai
      .request(app)
      .patch(`${prefix}/activate?id=${id}`)
      .set('x-access-token', `${falseToken}`)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property(
          'error',
          'Please check your email to verify your email and continue'
        );
        expect(res.body).to.have.property('status', 403);
        expect(res);
        done();
      });
  });

  it('should should activate insurance company which is not found', (done) => {
    chai
      .request(app)
      .patch(`${prefix}/activate?id=${wrongId}`)
      .set('x-access-token', `${mockToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error', 'Insurance company not found');
        expect(res.body).to.have.property('status', 404);
        expect(res);
        done();
      });
  });

  it('should should activate insurance company', (done) => {
    chai
      .request(app)
      .patch(`${prefix}/activate?id=${id}`)
      .set('x-access-token', `${mockToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          'message',
          'Insurance company has been activated'
        );
        expect(res.body).to.have.property('status', 200);
        expect(res);
        done();
      });
  });

  it('should have status 500', async () => {
    const results = await companiesController.activate(
      nodeCompany.request,
      nodeCompany.response
    );
    expect(results.statusCode).to.be.equal(500);
  });
});
