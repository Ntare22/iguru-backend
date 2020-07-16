import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const encode = (claims) => {
  const token = jwt.sign(claims, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};

export const decode = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};
