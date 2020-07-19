import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import Models from '../database/models';
import { encode, decode } from '../utils/jwt-processor';
import sendMsg from '../utils/sendEmail';
import resetPwd from '../utils/reset-pwd';

class userController {
  static async signUp(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const newUser = await Models.Users.create({
        id: uuid(),
        firstName,
        lastName,
        email,
        password: hash,
        verified: false,
        role: 'customer',
      });

      const data = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        verified: newUser.verified,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };

      const token = encode(data);

      const emailContent = {
        intro: 'Welcome to Iguru Insurance Platform',
        instruction:
          'Please confirm your email address on so that you can continue using our platform',
        text: 'Verify',
        signature: 'signature',
      };
      const link = `http://${process.env.BASE_URL}/api/v1/auth/verification?token=${token}`;
      await sendMsg(email, firstName, emailContent, link);
      return res.status(201).json({
        status: 201,
        message: 'Your account have been created successfully',
        token,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const { Users } = Models;
      const registered = await Users.findOne({
        where: {
          email,
        },
      });

      if (!registered) {
        return res.status(401).json({
          status: 401,
          error: 'Incorrect username/email or password combination',
        });
      }

      const truePassword = await bcrypt.compareSync(password, registered.password);

      if (!truePassword) {
        return res.status(401).json({
          status: 401,
          error: 'Incorrect username/email or password combination',
        });
      }

      const data = {
        id: registered.id,
        firstName: registered.firstName,
        lastName: registered.lastName,
        email: registered.email,
        verified: registered.verified,
        role: registered.role,
        createdAt: registered.createdAt,
        updatedAt: registered.updatedAt,
      };

      const token = encode({
        data,
      });

      return res.status(200).json({
        status: 200,
        message: 'User login successfully',
        data: { token, data },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error:
          'This service is currently unavailable. Developers at iguru are maintaining it',
      });
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    const { Users } = Models;
    try {
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) return res.status(404).json({ error: 'User not found' });
      await resetPwd.forgotPwd(user);

      return res.status(200).json({
        status: 200,
        message: 'Forgot password email has been sent, check your email',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'This service is currently unavailable.',
      });
    }
  }

  static async resetPassword(req, res) {
    const { email } = req.query;
    const { password } = req.body;
    const { Users } = Models;
    try {
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      const encryptedPassword = await bcrypt.hash(password, 10);

      await resetPwd.resetPassword(user.id, encryptedPassword);

      return res.status(200).json({
        status: 200,
        message: 'Your password has been reset',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'This service is currently unavailable.',
      });
    }
  }

  static async verifyUser(req, res) {
    const { token } = req.query;
    const { Users } = Models;
    const registeredUser = decode(token);

    const user = Users.findOne({ where: { id: registeredUser.id } });

    if (user.verified === false) {
      await Users.update(
        {
          verified: true,
        },
        { where: { id: registeredUser.id } }
      );
      return res.status(200).json({
        status: 200,
        message: `User is successfully verified`,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'This link is no longer valid',
    });
  }
}

export default userController;
