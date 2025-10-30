import Book from '../models/bookModel.js';
import User from '../models/userModel.js';
import zod from 'zod';
const bookSchema = zod.object({
  title: zod.string().min(1, 'Title is required'),
  author: zod.string().min(1, 'Author is required'),
  publisher: zod.string().min(1, 'Publisher is required'),
  genre: zod.string().min(1, 'Genre is required'),
  isbn: zod.string().min(1, 'ISBN is required'),
  totalQuantity: zod.number().min(1, 'Total Quantity is required'),
  location: zod.string().min(1, 'Location is required'),
});

const addBooks = async (req, res) => {
  try {
    const {title, author, publisher, genre, isbn, totalQuantity, location} =
      req.body;

    const validation = bookSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .json({message: 'Invalid book data', errors: validation.error.errors});
    }
    // if (
    //   !title ||
    //   !author ||
    //   !isbn ||
    //   !totalQuantity ||
    //   !genre ||
    //   !publisher ||
    //   !location
    // ) {
    //   return res.status(401).json({message: 'All things are required'});
    // }
    const bookexist = await Book.findOne({isbn});
    if (bookexist) {
      return res
        .status(400)
        .json({message: 'Book with this ISBN already exist'});
    }
    const newBookData = {
      title,
      author,
      publisher,
      genre,
      isbn,
      totalQuantity,
      location,
    };
    const validateNewBook = bookSchema.safeParse(newBookData);
    if (!validateNewBook.success) {
      return res
        .status(400)
        .json({
          message: 'Invalid book data',
          errors: validateNewBook.error.errors,
        });
    }
    const newBook = await Book.create(newBookData);
    return res
      .status(200)
      .json({message: 'Book added successfully', book: newBook});
  } catch (error) {
    return res.status(401).json({message: 'Book addition failed'});
  }
};

const getallBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json(books);
  } catch (error) {
    return res.status(401).json({message: 'Error in getting all books'});
  }
};
const getbooksId = async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);
    if (!books) {
      return res.status(401).json({message: 'book not found'});
    }
    res.status(200).json(books);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({message: 'Invalid Book ID format'});
    }
    return res
      .status(401)
      .json({message: 'Error in finding the required Book'});
  }
};
const updateBooks = async (req, res) => {
  try {
    const books = await Book.findByIdAndUpdate(req.params.id, req.body, {
      // giving books with updated values
      new: true,
      runValidators: true,
    });
    if (!books) {
      return res.status(401).json({message: 'book not found'});
    }
    res.status(200).json({message: 'Book updated successfully'});
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({message: 'Invalid Book ID format'});
    }
    // 11000 is MONGO db error code for dublicate
    if (error.code === 11000 && error.keyPattern?.isbn) {
      return res.status(400).json({message: 'ISBN must be unique.'});
    }
  }
};
const deleteBooks = async (req, res) => {
  try {
    const books = await Book.findByIdAndDelete(req.params.id);
    if (!books) {
      return res.status(401).json({message: 'Book with this id not found'});
    }
    res.status(200).json({message: 'Book deleted successfully'});
  } catch (error) {
    return res.status(401).json({message: 'Error in deleting the book'});
  }
};
const borrowedBook = async(req,res)=>{
  const bookID = req.params.id
  const userID = req.user._id

  co

}

export {addBooks, getallBooks, getbooksId, updateBooks, deleteBooks};
