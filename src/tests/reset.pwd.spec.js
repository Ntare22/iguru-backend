import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import nodemailer from 'nodemailer';
import app from '../index';

chai.use(chaiHttp);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jimnm2018@gmail.com',
    passcode: process.env.passcode,
  },
});

describe('Forgot password feature', () => {
  beforeEach(() => {
    sinon.stub(transporter, 'sendMail').resolves({
      to: 'james@gmail.com',
      from: 'info@iguru.com',
      subject: 'Forgot password message',
      html: 'this is stubbing message',
    });
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should not send an email user', (done) => {
    chai
      .request(app)
      .put('/api/v1/auth/forgot/password')
      .send({
        email: 'jim@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(
          'Forgot password email has been sent, check your email'
        );
        done();
      });
  });
  it("should not send an email to the user who isn't sign up or invalid emaill", (done) => {
    chai
      .request(app)
      .put('/api/v1/auth/forgot/password')
      .send({
        email: 'john1.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('User not found');
        done();
      });
  });
});

describe('reset password feature', () => {
  before((done) => {
    const loggedUser = {
      firstName: 'James',
      lastName: 'Franco',
      email: 'james@gmail.com',
      password: 'NSdead@11231',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(loggedUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it("should  not reset password for user who didn't provide valid password", (done) => {
    chai
      .request(app)
      .put('/api/v1/auth/reset/password?email=james@gmail.com')
      .send({
        password: '@qwe',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Your password has been reset');
        done();
      });
  });
});
