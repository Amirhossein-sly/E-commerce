import { createSlice, createSelector } from "@reduxjs/toolkit";

// Available coupons
const COUPONS = {
  SAVE10: { discount: 0.1, minAmount: 50, description: "10% off orders over $50" },
  FREESHIP: { freeShipping: true, description: "Free shipping on any order" }
};

const initialState = {
  appliedCoupon: null,
  couponStatus: null,
};

const cartOperationsSlice = createSlice({
  name: "cartOperations",
  initialState,
  reducers: {
    applyCoupon: (state, action) => {
      const code = action.payload.toUpperCase();
      const coupon = COUPONS[code];

      if (!coupon) {
        state.appliedCoupon = null;
        state.couponStatus = {
          type: "error",
          message: "Invalid coupon code"
        };
        return;
      }

      // Check if coupon requirements are met
      if (code === "SAVE10" && action.payload.subtotal < coupon.minAmount) {
        state.appliedCoupon = null;
        state.couponStatus = {
          type: "error",
          message: `Minimum order of $${coupon.minAmount} required for this coupon`
        };
        return;
      }

      state.appliedCoupon = code;
      state.couponStatus = {
        type: "success",
        message: code === "SAVE10"
          ? "Coupon applied! 10% off your subtotal."
          : "Coupon applied! Shipping is now free."
      };
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.couponStatus = null;
    },
    clearCouponStatus: (state) => {
      state.couponStatus = null;
    }
  },
});

export const { applyCoupon, removeCoupon, clearCouponStatus } = cartOperationsSlice.actions;

// Selectors for cart calculations
export const selectCartCalculations = createSelector(
  [(state) => state.cart, (state) => state.cartOperations.appliedCoupon],
  (cart, appliedCoupon) => {
    const subtotal = cart.reduce((sum, product) => sum + product.quantity * product.price, 0);
    const couponDiscount = appliedCoupon === "SAVE10" ? +(subtotal * 0.1).toFixed(2) : 0;
    let shipping = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 9.99;

    if (appliedCoupon === "FREESHIP" && subtotal > 0) {
      shipping = 0;
    }

    const total = subtotal - couponDiscount + shipping;

    return {
      subtotal,
      couponDiscount,
      shipping,
      total,
      appliedCoupon,
      itemCount: cart.reduce((total, item) => total + item.quantity, 0)
    };
  }
);

export const selectAvailableCoupons = () => COUPONS;

export const selectCouponStatus = (state) => state.cartOperations.couponStatus;

export default cartOperationsSlice.reducer;
