import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { user, errorUser } from './mock/user.mock';
import companiesController from '../controllers/companiesController';
import { company, emptyCompany, nodeCompany } from './mock/insurance.company.mock';
import { mockToken, falseToken } from './mock/jwt.mock';

chai.use(chaiHttp);

const prefix = '/api/v1/company';

describe('ADD COMPANY', () => {
  it('should not allow adding company without login', (done) => {
    chai
      .request(app)
      .post(`${prefix}/add`)
      .send(company)
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
      .post(`${prefix}/add`)
      .set('x-access-token', `${falseToken}`)
      .send(company)
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

  it('should not allow adding insurance company without providing data', (done) => {
    chai
      .request(app)
      .post(`${prefix}/add`)
      .set('x-access-token', `${mockToken}`)
      .send(emptyCompany)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status', 422);
        expect(res);
        done();
      });
  });

  it('should should add a new insurance company', (done) => {
    chai
      .request(app)
      .post(`${prefix}/add`)
      .set('x-access-token', `${mockToken}`)
      .send(company)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          'message',
          'New insurance company was added successfully'
        );
        expect(res.body).to.have.property('status', 201);
        expect(res);
        done();
      });
  });

  it('should have status 500', async () => {
    const results = await companiesController.add(
      nodeCompany.request,
      nodeCompany.response
    );
    expect(results.statusCode).to.be.equal(500);
  });
});
