import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import Models from '../database/models';
import { encode, decode } from '../utils/jwt-processor';

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
      const { email, password } = req.body,
        { Users } = Models,
        registered = await Users.findOne({
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
        data,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error:
          'This service is currently unavailable. Developers at barefoot nomad are maintaining it',
      });
    }
  }
}

export default userController;
