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
  quantityAvailable: {
    type: Number,
    require: true,
    min: [0, 'Available quantity cannot be negative'],
    validate: { 
      // Ensure available not more than total 
        validator: function(value) {
          
          return value <= this.totalQuantity;
        },
        message: 'Available quantity cannot exceed total quantity'
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
  },
  isbn:{
    type:Number,
    require:true
  },
  totalQuantity: {
      type: Number,
      required: true,
      min: [1, 'Total quantity must be at least 1'], 
      default: 1,
    },
});
const Book = mongoose.model('Book', bookSchema); 

export default Book;
