import express from 'express';
import {
  addBooks,
  getallBooks,
  getbooksId,
  updateBooks,
  deleteBooks,
} from '../controllers/bookController.js';

import protect from '../middleware/authentication.js';

const router = express.Router();
router.post('/', protect, addBooks);
router.get('/', getallBooks);
router.get('/:id', getbooksId);
router.put('/:id', protect, updateBooks);
router.delete('/:id', protect, deleteBooks);
export default router;
