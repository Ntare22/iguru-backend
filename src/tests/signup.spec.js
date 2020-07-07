import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { user, errorUser } from './mock/user.mock';
import userController from '../controllers/userController';
import userNode from './mock/user.node.moch';

chai.use(chaiHttp);

const prefix = '/api/v1/auth';

describe('SERVER CONFIG CHECK', () => {
  it('users should be able to create accounts', (done) => {
    chai
      .request(app)
      .post(`${prefix}/signup`)
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          'message',
          'Your account have been created successfully'
        );

        done();
      });
  });

  it('should not create a user with a take email', (done) => {
    chai
      .request(app)
      .post(`${prefix}/signup`)
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: 'blaise@gmail.com',
        password: user.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error', 'This email have been taken');

        done();
      });
  });

  it("should return an error message when the firstName isn't only letter", (done) => {
    chai
      .request(app)
      .post(`${prefix}/signup`)
      .send({
        firstName: errorUser.firstName,
        lastName: user.lastName,
        email: 'email@gmail.com',
        password: user.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status', 422);
        expect(res.body.error).to.deep.equal([
          "Please don't use digits in your first name",
        ]);
        done();
      });
  });

  it("should return an error message when the lastName isn't only letter", (done) => {
    chai
      .request(app)
      .post(`${prefix}/signup`)
      .send({
        firstName: user.firstName,
        lastName: errorUser.lastName,
        email: 'email@gmail.com',
        password: user.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status', 422);
        expect(res.body.error).to.deep.equal([
          "Please don't use digits in your last name",
        ]);
        done();
      });
  });

  it('should return an error message when the firstName is not given', (done) => {
    chai
      .request(app)
      .post(`${prefix}/signup`)
      .send({
        lastName: user.lastName,
        email: 'email@gmail.com',
        password: user.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status', 422);
        expect(res.body.error).to.deep.equal(['Please provide a first name']);
        done();
      });
  });

  it('should return an error message when the lastName is not given', (done) => {
    chai
      .request(app)
      .post(`${prefix}/signup`)
      .send({
        firstName: user.firstName,
        email: 'email@gmail.com',
        password: user.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status', 422);
        expect(res.body.error).to.deep.equal(['Please provide a last name']);
        done();
      });
  });
  it('should return an error message if email is not given', (done) => {
    chai
      .request(app)
      .post(`${prefix}/signup`)
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.deep.equal(['Please provide an email']);
        expect(res.body).to.have.property('status', 422);
        done();
      });
  });
  it('should return an error message if email provided is not valid', (done) => {
    chai
      .request(app)
      .post(`${prefix}/signup`)
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: errorUser.email,
        password: user.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.deep.equal(['Please provide a valid email']);
        expect(res.body).to.have.property('status', 422);
        done();
      });
  });
  it('should have status 500', async () => {
    const results = await userController.signUp(userNode.request, userNode.response);
    expect(results.statusCode).to.be.equal(500);
  });
});
