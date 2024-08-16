import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};

 const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
        state.loading = true;

        const { id, quantity } = action.payload;
  
        const index = state.cartItems.findIndex((item) => item.id === id);

  
        if (index !== -1) {
          // If the item already exists, update its quantity
          state.cartItems[index].quantity += quantity;
        } else {
          // If the item doesn't exist, add it to the cartItems array
          state.cartItems.push({ ...action.payload, quantity: 1 });
        }
  
        state.loading = false;
      },
  

    removeCartItem(state, action) {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.loading = false;
    },
    incrementQuantity(state, action) {
        const { productId } = action.payload;
        const index = state.cartItems.findIndex((item) => item.id === productId);
        if (index !== -1) {
            state.cartItems[index].quantity += 1;
        }
    },

    decrementQuantity(state, action) {
        const { productId } = action.payload;
        const index = state.cartItems.findIndex((item) => item.id === productId);
        if (index !== -1 && state.cartItems[index].quantity > 1) {
          state.cartItems[index].quantity -= 1;
        }
    },

    calculatePrice(state) {
      const subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 500 ? 0 : 5;
      state.tax = Math.round(state.subtotal * 0.1);
      state.total =
        state.subtotal + state.tax + state.shippingCharges;
    },

    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
    resetCart() {
      return initialState;
    },
  },
});


export const {
    addToCart,
    removeCartItem,
    calculatePrice,
    saveShippingInfo,
    resetCart,
    incrementQuantity,
    decrementQuantity

} = cartSlice.actions;

export default cartSlice.reducer