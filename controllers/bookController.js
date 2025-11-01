import Book from '../models/bookModel.js';
import User from '../models/userModel.js';

const addBooks = async (req, res) => {
  try {
    const {title, author, publisher, genre, isbn, totalQuantity, location} =
      req.body;

    if (
      !title ||
      !author ||
      !isbn ||
      !totalQuantity ||
      !genre ||
      !publisher ||
      !location
    ) {
      return res.status(400).json({
        message:
          'Title, Author, ISBN, Total Quantity, Genre, Publisher, and Location are required',
      });
    }

    // Check if book exists
    const bookexist = await Book.findOne({isbn});
    if (bookexist) {
      return res
        .status(400)
        .json({message: 'Book with this ISBN already exists'});
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

    return res
      .status(201)
      .json({message: 'Book added successfully', book: newBook});
  } catch (error) {
    console.error('Error adding book:', error);

    return res.status(500).json({
      message: 'Book addition failed due to server error',
      error: error.message,
    });
  }
};

const getallBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    // Correct response format: send the array directly or inside an object
    return res.status(200).json(books); // Send the array of books
  } catch (error) {
    console.error('Error getting all books:', error);

    return res.status(500).json({message: 'Error getting all books'});
  }
};

const getbooksId = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Renamed 'books' to 'book' for clarity
    if (!book) {
      return res.status(404).json({message: 'Book not found'});
    }
    res.status(200).json(book); // Send the single book object
  } catch (error) {
    console.error('Error getting book by ID:', error);

    if (error.kind === 'ObjectId') {
      return res.status(400).json({message: 'Invalid Book ID format'});
    }
    // Use 500 for other server errors
    return res.status(500).json({message: 'Error finding the required Book'});
  }
};

const updateBooks = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validation on update
    });
    if (!book) {
      return res.status(404).json({message: 'Book not found'});
    }

    res.status(200).json({message: 'Book updated successfully', book: book});
  } catch (error) {
    console.error('Error updating book:', error);

    if (error.kind === 'ObjectId') {
      return res.status(400).json({message: 'Invalid Book ID format'});
    }
    // Handle potential duplicate ISBN error during update
    if (error.code === 11000 && error.keyPattern?.isbn) {
      return res.status(400).json({message: 'ISBN must be unique.'});
    }
    // Use 500 for other server errors
    return res
      .status(500)
      .json({message: 'Error updating book', error: error.message});
  }
};

const deleteBooks = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({message: 'Book with this id not found'});
    }
    res.status(200).json({message: 'Book deleted successfully'});
  } catch (error) {
    console.error('Error deleting book:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({message: 'Invalid Book ID format'});
    }

    return res.status(500).json({message: 'Error deleting the book'});
  }
};
const borrowedBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userID = req.suer._id;

    const book = await Book.findOne(bookId);
    if (!book) {
      return res
        .status(401)
        .json({message: "Book with this ID can't be borrowed"});
    }

    if (book.quantityAvailable <= 0) {
      return res.status(401).json({message: 'Sorry!!,Book is Not available'});
    }

    const user = await User.findOne(userID);
    if (!user) {
      return res.status(401).json({message: 'Sorry!!, user not found'});
    }
    // it checks if user already borrowed the book
    const alreadyBorrowed = user.borrowedBooks.some(
      (borrowed) => borrowed.book.toString() === bookId
    );
    if (alreadyBorrowed) {
      return res
        .status(400)
        .json({message: 'You have already borrowed this book'});
    }

    // decreasing the quantity
    book.quantityAvailable = book.quantityAvailable - 1;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Add 14 days

    // Add Book to User's Borrowed List
    user.borrowedBooks.push({book: bookId, dueDate: dueDate});

    //  Save Changes to Database
    await book.save();
    await user.save();

    res.status(200).json({
      message: 'Book borrowed successfully',
      dueDate: dueDate.toISOString().split('T')[0],
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res
        .status(400)
        .json({message: 'Invalid Book ID or User ID format'});
    }

    res
      .status(500)
      .json({message: 'Server error borrowing book', error: error.message});
  }
};

const returnBook = async(req,res)=>{
  const book = await Book.findById(bookID)
}

export {
  addBooks,
  getallBooks,
  getbooksId,
  updateBooks,
  deleteBooks,
  borrowedBook,
};
