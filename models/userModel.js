import mongoose from 'mongoose';
const borrowedBookSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
}, {_id: false});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    // array to store borrowed book info
    borrowedBooks: [borrowedBookSchema],
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model('User', userSchema);
export default User;
