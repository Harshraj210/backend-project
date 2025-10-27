import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


const handleRegister =  async(req, res)=>{
  const {name,email,password}= req.body
  if(!name || !email || !password){
    return res.status(404).json({message:"Signup failed"})
  }
  const newUser = await User.create({
    name,
    email,
    password
  })
}