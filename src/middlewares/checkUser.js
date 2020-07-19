import { decode } from '../utils/jwt-processor';
import Models from '../database/models';

const { Users } = Models;
const checkUser = async (req, res, next) => {
  const Token = req.headers['x-access-token'];
  if (!Token) {
    return res.status(403).json({
      status: 403,
      error: 'Please log in or sign up to continue',
    });
  }
  const payload = decode(Token);

  const { email } = payload.data;
  const user = await Users.findOne({ where: { email } });
  const { verified } = user;

  if (!verified) {
    return res.status(403).json({
      status: 403,
      error: 'Please check your email to verify your email and continue',
    });
  }
  req.user = user;
  next();
};
export default checkUser;
