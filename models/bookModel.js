import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  availablebooks: {
    type: Number,
    require: true,
  },
  genre:{
    type:String,
    require:true
  },
  publisher:{
    type:String,
    require:true
  },
  location:{
    type:String,
    require:true
  }
});
const Book = mongoose.model('Book', bookSchema); 

export default Book;
