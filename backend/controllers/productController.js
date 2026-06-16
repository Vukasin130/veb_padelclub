import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Reservation from '../models/reservationModel.js';
import Slot from '../models/slotModel.js';

const appendAvailableSlots = async (product) => {
  const activeReservations = await Reservation.find({ status: 'active' }).select(
    'reservationItems.slot'
  );
  const reservedSlotIds = activeReservations.flatMap((reservation) =>
    reservation.reservationItems
      .filter((item) => item.slot)
      .map((item) => item.slot.toString())
  );

  const activeSlots = await Slot.find({
    product: product._id,
    isActive: true,
  }).sort({ createdAt: 1 });

  const slots = activeSlots.filter(
    (slot) => !reservedSlotIds.includes(slot._id.toString())
  );

  const slotBackedProduct = activeSlots.length > 0;

  /*
   * If a product is sold through concrete time slots, stock must follow the
   * remaining slots. Otherwise memberships and non-scheduled offers keep their
   * own stock value.
   */
  const visibleStock = slotBackedProduct ? slots.length : product.countInStock;

  const availableSlots = slots.reduce((groups, slot) => {
    const existingGroup = groups.find((group) => group.date === slot.dateLabel);
    const mappedSlot = {
      id: slot._id,
      _id: slot._id,
      time: slot.time,
      duration: slot.duration,
      court: slot.court,
      price: slot.price,
    };

    if (existingGroup) {
      existingGroup.slots.push(mappedSlot);
    } else {
      groups.push({
        date: slot.dateLabel,
        slots: [mappedSlot],
      });
    }

    return groups;
  }, []);

  return {
    ...product.toObject(),
    countInStock: visibleStock,
    availableSlots,
  };
};

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  const productsWithSlots = await Promise.all(products.map(appendAvailableSlots));

  res.json(productsWithSlots);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(await appendAvailableSlots(product));
  } else {
    res.status(404);
    throw new Error('Ponuda nije pronadjena');
  }
});

export { getProducts, getProductById };
