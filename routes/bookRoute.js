import express from 'express';
import {
  addBooks,
  getallBooks,
  getbooksId,
  updateBooks,
  deleteBooks,
  borrowedBook,
  returnBook,
} from '../controllers/bookController.js';

import protect from '../middleware/authentication.js';

const router = express.Router();
router.post('/', protect, addBooks);
router.get('/', getallBooks);
router.get('/:id', getbooksId);
router.put('/:id', protect, updateBooks);
router.delete('/:id', protect, deleteBooks);
router.post('/:id/borrow', protect, borrowedBook);
router.post('/:id/return', protect, returnBook);
export default router;
