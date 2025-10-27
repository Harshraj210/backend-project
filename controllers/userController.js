import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const handleRegister =  async(req, res)=>{
  const {name,email,password}= req.body
  if(!name || !email || !password){
    return res.status(404).json({message:"Fill all the details Signup failed"})
  }
  const userExist = User.findOne({email})
  if(userExist){
    return res.status(400).json({message:"USer already exist"})
  }
  const hashedPassword = await bcrypt(password,10)
  const newUser = await User.create({
    name,
    email,
    password:hashedPassword
  })
}