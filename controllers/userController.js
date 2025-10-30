import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_KEY, {
    expiresIn: '30d',
  });
};

const handleRegister = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
      return res
        .status(404)
        .json({message: 'Fill all the details Signup failed'});
    }
    const userExist = await User.findOne({email});
    if (userExist) {
      return res.status(400).json({message: 'USer already exist'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token: generateToken(newUser._id),
    });
  } catch (error) {
    return res.status(400).json({message: 'Error in registering User', error});
  }
};
const handleLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({message: 'Please provide email and password'});
    }
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({messsage: 'User not found Try again'});
    }

    const safePassword = await bcrypt.compare(password, user.password);
    if (!safePassword) {
      return res.status(401).json({message: 'Invalid Password!!'});
    }
    return res.status(200).json({
      message: 'Login successfull',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(401).json({message: 'Login failed!!', error});
  }
};
export {handleRegister, handleLogin};
