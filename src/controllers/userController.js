import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import Models from '../database/models';

class userController {
  static async signUp(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      await Models.Users.create({
        id: uuid(),
        firstName,
        lastName,
        email,
        password: hash,
        verified: false,
        role: 'customer',
      });

      return res.status(201).json({
        status: 201,
        message: 'Your account have been created successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}

export default userController;
