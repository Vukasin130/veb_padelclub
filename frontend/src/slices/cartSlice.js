import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const storedCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : null;

const initialState = storedCart
    ? {
        ...storedCart,
        reservationContact: storedCart.reservationContact || storedCart.shippingAddress || {},
      }
    : { cartItems: [], reservationContact: {}, paymentMethod: 'Kartica ili placanje u klubu' };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !==
                action.payload);
            return updateCart(state);
        },
        saveReservationContact: (state, action) => {
            state.reservationContact = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        },
    },
});
export const { addToCart, removeFromCart, saveReservationContact, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
