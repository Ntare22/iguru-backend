import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import userController from '../controllers/userController';
import userNode from './mock/user.node.mock';

chai.use(chaiHttp);
describe('Sign in tests', () => {
  it('It should login successfuly', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'blaise@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res.body).to.have.keys('status', 'message', 'data');
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('User login successfully');
        expect(res);
        done();
      });
  });

  it('should not login a user with a wrong password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'blaise@gmail.com',
        password: 'password123',
      })
      .end((err, res) => {
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.status).to.be.equal(401);
        expect(res.body.error).to.be.equal(
          'Incorrect username/email or password combination'
        );
        expect(res.body.error).to.be.a('string');
        expect(res);
        done();
      });
  });

  it('It should show an error if the user tries to sign in with invalid credentials', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'wrong.email@wrong.com',
        password: 'wrong',
      })
      .end((err, res) => {
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.status).to.be.equal(401);
        expect(res.body.error).to.be.equal(
          'Incorrect username/email or password combination'
        );
        expect(res.body.error).to.be.a('string');
        expect(res);
        done();
      });
  });

  it('should have status 500', async () => {
    const results = await userController.login(userNode.request, userNode.response);
    expect(results.statusCode).to.be.equal(500);
  });
});
