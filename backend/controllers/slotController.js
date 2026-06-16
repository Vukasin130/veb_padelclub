import asyncHandler from 'express-async-handler';
import Slot from '../models/slotModel.js';
import Reservation from '../models/reservationModel.js';

const getSlots = asyncHandler(async (req, res) => {
  const slots = await Slot.find({}).populate('product', 'name category');
  const reservations = await Reservation.find({ status: 'active' })
    .populate('user', 'name email')
    .select('reservationItems.slot user reservationDetails status');

  const slotsWithStatus = slots.map((slot) => {
    const reservation = reservations.find((item) =>
      item.reservationItems.some(
        (reservationItem) =>
          reservationItem.slot &&
          reservationItem.slot.toString() === slot._id.toString()
      )
    );

    return {
      ...slot.toObject(),
      reservedBy: reservation
        ? {
            reservationId: reservation._id,
            userName: reservation.user.name,
            userEmail: reservation.user.email,
            contactName: reservation.reservationDetails.name,
            phone: reservation.reservationDetails.phone,
          }
        : null,
    };
  });

  res.json(slotsWithStatus);
});

const createSlot = asyncHandler(async (req, res) => {
  const { product, dateLabel, time, duration, court, price } = req.body;

  const slot = new Slot({
    product,
    dateLabel,
    time,
    duration,
    court,
    price,
  });

  const createdSlot = await slot.save();
  res.status(201).json(createdSlot);
});

const deleteSlot = asyncHandler(async (req, res) => {
  const slot = await Slot.findById(req.params.id);

  if (!slot) {
    res.status(404);
    throw new Error('Termin nije pronadjen');
  }

  slot.isActive = false;
  await slot.save();

  res.json({ message: 'Termin je uklonjen iz ponude' });
});

export { getSlots, createSlot, deleteSlot };
