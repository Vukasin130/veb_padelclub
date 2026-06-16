import mongoose from 'mongoose';

const reservationItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
  },
  selectedSlot: {
    date: String,
    time: String,
    duration: String,
    court: String,
  },
  addOns: [
    {
      name: String,
      price: Number,
    },
  ],
});

const reservationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    reservationItems: [reservationItemSchema],
    reservationDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      note: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    itemsPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    servicePrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      required: true,
      enum: ['active', 'cancelled'],
      default: 'active',
    },
    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
