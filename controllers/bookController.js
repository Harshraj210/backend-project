import Book from '../models/bookModel.js';
import User from '../models/userModel.js';

const addBooks = async (req, res) => {
  try {
    const {title, author, publisher, genre, isbn, totalQuantity, location} = req.body;
    if (!title || !author || !isbn || !totalQuantity || !genre || !publisher || !location) {
      return res.status(401).json({message: 'All things are required'});
    }
    const bookexist = await Book.findOne({isbn});
    if (bookexist) {
      return res
        .status(400)
        .json({message: 'Book with this ISBN already exist'});
    }
    const newBook = await Book.create({
      title,
            author,
            publisher,
            genre, 
            isbn,
            totalQuantity, 
            
            location,
    });
  } catch (error) {
    return res.status(401).json({message: 'Book addition failed'});
  }
};

const getallBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({message: 'all books are here'}, books);
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
    if (error.kind === 'objectId') {
      return res.status(400).json({ message: 'Invalid Book ID format' })
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

export {addBooks, getallBooks, getbooksId, updateBooks, deleteBooks};
