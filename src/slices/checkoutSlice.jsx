import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  paymentMethod: "card", // card, paypal, cash
  orderNotes: "",
  isProcessing: false,
  orderId: null,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setOrderNotes: (state, action) => {
      state.orderNotes = action.payload;
    },
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  updateCustomerInfo,
  setPaymentMethod,
  setOrderNotes,
  setProcessing,
  setOrderId,
  setError,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
