import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    remove: (state, action) => {
      return state.filter(i => i.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, change } = action.payload;
      const item = state.find(i => i.id === id);
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
          return state.filter(i => i.id !== id);
        }
      }
    },

    clearCart: () => []
  }
});

export const { add, remove, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
