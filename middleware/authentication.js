import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({message: 'No token, Not authorized!!'});
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(404).json({message: 'User not found'});
    }
    next();
  } catch (error) {
    return res.status(401).json({message: 'Token invalid!!'});
  }
};

export default protect;
