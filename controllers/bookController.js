import Book from "../models/bookModel";
import User from "../models/userModel";

const addBook = async(resizeBy,res)=>{
  const{title,author,publisher,availablebooks}=req.body
  if(!title || !author || !publisher || !availablebooks ){
    return res.status(401).json({message:"All things are required"})
  }
  

}