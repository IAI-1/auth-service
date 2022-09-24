import express from 'express';
import * as controller from '../controllers/booksController.js';
import authGuard from '../middlewares/authGuard.js';

const router = express.Router();

// Get all books
router.get('/', controller.findAll);

// Get specific book by id
router.get('/:id', controller.findById);

// Create new book
router.post('/', authGuard, controller.create);

// Update specific book by id
router.put('/:id', controller.updateById);

// Delete specific book by id
router.delete('/:id', controller.deleteById);

export default router;
