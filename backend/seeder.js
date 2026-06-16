import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import buildSlots from './data/buildSlots.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Slot from './models/slotModel.js';
import Reservation from './models/reservationModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Reservation.deleteMany();
    await Slot.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    const createdProducts = await Product.insertMany(sampleProducts);
    const sampleSlots = buildSlots(createdProducts);

    await Slot.insertMany(sampleSlots);

    console.log('Podaci su importovani'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Reservation.deleteMany();
    await Slot.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Podaci su obrisani'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
