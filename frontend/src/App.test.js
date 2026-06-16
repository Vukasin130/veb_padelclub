import { updateCart } from './utils/cartUtils';

test('calculates reservation cart totals', () => {
  const cart = updateCart({
    cartItems: [
      { name: 'Rezervacija padel terena', qty: 2, price: 2400 },
      { name: 'Iznajmljivanje reketa', qty: 1, price: 500 },
    ],
  });

  expect(cart.itemsPrice).toBe('5300.00');
  expect(cart.shippingPrice).toBe('0.00');
  expect(cart.taxPrice).toBe('1060.00');
  expect(cart.totalPrice).toBe('6360.00');
});
