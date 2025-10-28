import Book from '../models/bookModel';
import User from '../models/userModel';

const addBook = async (resizeBy, res) => {
  try {
    const {title, author, publisher, availablebooks, isbn} = req.body;
    if (!title || !author || !publisher || !availablebooks) {
      return res.status(401).json({message: 'All things are required'});
    }
    const bookexist = await Book.findOne({isbn});
    if (bookexist) {
      return res
        .status(401)
        .json({message: 'Book with this ISBN already exist'});
    }
    const newBook = await Book.create({
      title,
      author,
      publisher,
      genre,
      isbn,
      availablebooks,
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
  } catch (error) {
    return res
      .status(401)
      .json({message: 'Error in finding the required Book'});
  }
};
