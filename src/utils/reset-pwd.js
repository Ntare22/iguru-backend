import dotenv from 'dotenv';
import sendMsg from './sendEmail';
import Models from '../database/models';

dotenv.config();

const { Users } = Models;

export default class resetPwd {
  static async forgotPwd(user) {
    const link = `http://${process.env.BASE_URL}/api/v1/auth/reset/password?email=${user.email}`;
    const content = {
      intro: 'Reset your Password',
      instruction: 'Please click on the button below to reset password.',
      text: 'Reset Password',
      signature: 'signature',
    };
    return sendMsg(user.email, user.firstName, content, link);
  }

  static async resetPassword(id, password) {
    await Users.update(
      { password },
      {
        where: {
          id,
        },
      }
    );
  }
}
