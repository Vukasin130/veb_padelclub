import express from 'express';
import {
  addReservationItems,
  getMyReservations,
  getReservationById,
  getReservations,
  cancelReservation,
} from '../controllers/reservationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addReservationItems).get(protect, admin, getReservations);
router.route('/mine').get(protect, getMyReservations);
router.route('/:id').get(protect, getReservationById);
router.route('/:id/cancel').put(protect, admin, cancelReservation);

export default router;
