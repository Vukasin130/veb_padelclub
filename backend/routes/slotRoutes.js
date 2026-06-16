import express from 'express';
import {
  getSlots,
  createSlot,
  deleteSlot,
} from '../controllers/slotController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getSlots).post(protect, admin, createSlot);
router.route('/:id').delete(protect, admin, deleteSlot);

export default router;
