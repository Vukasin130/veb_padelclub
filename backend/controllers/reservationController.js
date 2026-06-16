import asyncHandler from 'express-async-handler';
import Reservation from '../models/reservationModel.js';
import Slot from '../models/slotModel.js';

const addReservationItems = asyncHandler(async (req, res) => {
  const {
    reservationItems,
    reservationDetails,
    paymentMethod,
    itemsPrice,
    taxPrice,
    servicePrice,
    totalPrice,
  } = req.body;

  if (!reservationItems || reservationItems.length === 0) {
    res.status(400);
    throw new Error('Nema stavki za rezervaciju');
  }

  const requestedSlotIds = reservationItems
    .filter((item) => item.slot)
    .map((item) => item.slot);

  if (requestedSlotIds.length > 0) {
    const availableSlots = await Slot.find({
      _id: { $in: requestedSlotIds },
      isActive: true,
    });

    if (availableSlots.length !== requestedSlotIds.length) {
      res.status(400);
      throw new Error('Jedan od termina vise nije dostupan');
    }
  }

  const reservedSlots = await Reservation.find({
    status: 'active',
    'reservationItems.slot': { $in: requestedSlotIds },
  });

  if (reservedSlots.length > 0) {
    res.status(400);
    throw new Error('Jedan od termina je vec rezervisan');
  }

  const reservation = new Reservation({
    reservationItems: reservationItems.map((item) => ({
      ...item,
      product: item.product,
      slot: item.slot || undefined,
    })),
    user: req.user._id,
    reservationDetails,
    paymentMethod,
    itemsPrice,
    taxPrice,
    servicePrice,
    totalPrice,
  });

  const createdReservation = await reservation.save();

  res.status(201).json(createdReservation);
});

const getMyReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(reservations);
});

const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (reservation) {
    if (
      reservation.user._id.toString() === req.user._id.toString() ||
      req.user.isAdmin
    ) {
      res.json(reservation);
    } else {
      res.status(401);
      throw new Error('Niste autorizovani za ovu rezervaciju');
    }
  } else {
    res.status(404);
    throw new Error('Rezervacija nije pronadjena');
  }
});

const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({})
    .populate('user', 'id name email')
    .sort({ createdAt: -1 });
  res.json(reservations);
});

const cancelReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (reservation) {
    reservation.status = 'cancelled';
    reservation.cancelledAt = Date.now();
    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } else {
    res.status(404);
    throw new Error('Rezervacija nije pronadjena');
  }
});

export {
  addReservationItems,
  getMyReservations,
  getReservationById,
  getReservations,
  cancelReservation,
};
