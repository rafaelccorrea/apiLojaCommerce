/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

const generateToken = (data) => {
  const token = jwt.sign(data, 'ganhepontos', {
    expiresIn: 86400,
  });

  return `bearer ${token}`;
};

export { generateToken };
