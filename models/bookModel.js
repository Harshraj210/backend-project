import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    quantityAvailable: {
      type: Number,
      required: true,
      min: [0, 'Available quantity cannot be negative'],

      default: function () {
        return this.totalQuantity;
      },
      validate: {
        validator: function (value) {
          // 'this' refers to the document being saved
          return value <= this.totalQuantity;
        },
        message: 'Available quantity cannot exceed total quantity',
      },
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    publisher: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
      min: [1, 'Total quantity must be at least 1'],
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({title: 'text', author: 'text'});

const Book = mongoose.model('Book', bookSchema);

export default Book;
